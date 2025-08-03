import jwt from 'jsonwebtoken';
import { DB_CONFIG } from '../../config/config.js';
import { UserEntity } from '../auth/schemas/auth.entity.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, DB_CONFIG.JWT_TOKEN, (err, decoded) => {
    console.log("🚀 ~ jwt.verify ~ decoded:", decoded);

    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    // ✅ declare first, then log
    const user = { id: decoded.id, email: decoded.email, role: decoded.role };
    console.log("✅ Authenticated user:", user);

    req.user = user;
    next();
  });
};

export const TokenVerify = (token) => {
  return jwt.verify(token, DB_CONFIG.JWT_TOKEN);
};
