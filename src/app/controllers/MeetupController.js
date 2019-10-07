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
    return res.json(req.meetup);
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
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    await req.meetup.update(req.body);

    return res.json(req.meetup);
  }

  async delete(req, res) {
    await req.meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
