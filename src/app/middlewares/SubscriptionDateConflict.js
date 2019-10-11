import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

export default async (req, res, next) => {
  const checkDate = await Subscription.findOne({
    where: {
      user_id: req.userId,
    },
    include: [
      {
        model: Meetup,
        as: 'meetup',
        required: true,
        where: {
          date: req.meetup.date,
        },
      },
    ],
  });

  if (checkDate) {
    return res.status(403).json({
      error: "Can't subscribe to two meetups at the same time",
    });
  }

  return next();
};
