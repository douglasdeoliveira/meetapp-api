import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async save(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async update(req, res) {
    const oldToken = req.headers.authorization.replace('Bearer ', '');

    jwt.verify(
      oldToken,
      authConfig.secret,
      {
        ignoreExpiration: true,
      },
      (err, payload) => {
        if (err) {
          return res.status(400).json({ error: 'Error to check your token' });
        }

        const { id } = payload;
        const token = jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        });
        return res.status(201).json({ token });
      }
    );
  }
}

export default new SessionController();
