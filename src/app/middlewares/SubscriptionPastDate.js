export default (req, res, next) => {
  if (req.subscription.meetup.past) {
    res.status(403).json({
      error: 'You cannot unsubscribe from a meeting that has already happened.',
    });
  }

  return next();
};
