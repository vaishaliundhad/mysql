import jwt from 'jsonwebtoken'
import { config } from '../../configs/configs.js'

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.JWT_TOKEN, (err, decoded) => {
    console.log("🚀 ~ jwt.verify ~ decoded:", decoded)
    if (err) {
      console.log("🚀 ~ jwt.verify ~ user:", user)
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    const user = { id: decoded.id, email: decoded.email, role: decoded.role}
    req.user = user;
    next();
  });
};

export const TokenVerify = (token) => {
  return jwt.verify(token, config.JWT_TOKEN);
};

