import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';

export default async (req, res, next) => {
  const subscription = await Subscription.findByPk(req.params.id, {
    include: [
      {
        model: Meetup,
        as: 'meetup',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
        ],
        attributes: ['id', 'title', 'date', 'location'],
      },
    ],
  });

  req.subscription = subscription;

  return next();
};
