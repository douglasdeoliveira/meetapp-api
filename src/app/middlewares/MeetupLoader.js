import File from '../models/File';
import Meetup from '../models/Meetup';
import User from '../models/User';

export default async (req, res, next) => {
  const meetup = await Meetup.findByPk(req.params.id, {
    attributes: ['id', 'title', 'description', 'location', 'date', 'file_id'],
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
  });

  if (!meetup) {
    return res.status(404).json({ error: 'Meetup not found.' });
  }

  req.meetup = meetup;
  return next();
};
