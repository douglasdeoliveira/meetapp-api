import User from '../models/User';

class UserController {
  async save(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, old_password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (old_password && !(await user.checkPassword(old_password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name, email: userEmail } = await user.update(req.body);

    return res.json({
      id,
      name,
      email: userEmail,
    });
  }
}

export default new UserController();
