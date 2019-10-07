export default (req, res, next) => {
  if (req.meetup.past) {
    return res
      .status(400)
      .json({ error: "Can't update or delete past meetups." });
  }

  return next();
};
