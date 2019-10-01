import { endOfDay, isBefore, isValid, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';

import File from '../models/File';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const where = {};
    const { date, page = 1, limit = 10 } = req.query;

    if (date && isValid(new Date(date))) {
      const searchDate = parseISO(date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['path', 'url'],
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: ['date'],
    });

    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
    });

    const freeMeetups = meetups.filter(meetup => {
      if (
        subscriptions.find(subscription => subscription.meetup_id === meetup.id)
      ) {
        return null;
      }
      return meetup;
    });

    return res.json(freeMeetups);
  }

  async findById(req, res) {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id, {
      attributes: ['title', 'description', 'location', 'date', 'file_id'],
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(meetup);
  }

  async save(req, res) {
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found.' });
    }

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups." });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups." });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
