import jwt from 'jsonwebtoken';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { config } from '../config/env.config.js';

export const LoginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email !== 'mallick@krishnalabelsinc.com') {
    return res.status(400).json({
      message: 'Wrong Credentials',
    });
  }

  if (password !== 'mallick@1234') {
    return res.status(400).json({
      message: 'Wrong Credentials',
    });
  }

  const token = jwt.sign(
    { email: 'mallick@krishnalabelsinc.com' },
    config.JWT_SECRET
  );

  return res.status(200).json({
    message: 'Login Sucessful',
    token,
  });
});
 