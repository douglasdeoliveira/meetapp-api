export default (req, res, next) => {
  if (req.userId !== req.meetup.user.id) {
    return res.status(403).json({ error: 'Not authorized.' });
  }

  return next();
};
