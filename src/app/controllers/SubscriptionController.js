import { Op } from 'sequelize';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'meetup_id', 'user_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'past',
          ],
          required: true,
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
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json(subscriptions);
  }

  async save(req, res) {
    const user = await User.findByPk(req.userId);

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: req.meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup: req.meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    await req.subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
