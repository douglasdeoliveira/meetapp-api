export default (req, res, next) => {
  if (req.meetup.userId === req.userId) {
    return res.status(403).json({
      error: "Can't subscribe to you own meetups",
    });
  }

  return next();
};
