import Subscription from '../models/Subscription';

export default async (req, res, next) => {
  const checkSubscriptionDuplicated = await Subscription.findOne({
    where: {
      user_id: req.userId,
      meetup_id: req.meetup.id,
    },
  });

  if (checkSubscriptionDuplicated) {
    return res.status(403).json({
      error: 'You are already subscribed to this meetup.',
    });
  }

  return next();
};
