import { DB_CONFIG } from "../../config/config.js";
import jwt  from 'jsonwebtoken';

export class TokenAuthService {
    generateToken(user , expireIndays){
      

       const payload ={
        id :user.id,
        email:user.email,
        role:user.role
       }
       const token = jwt.sign(payload , DB_CONFIG.TOKEN , {
        expiresIn : expireIndays
       })
       return token;
    }

   validateToken(tokenObj) {
  const { token } = tokenObj;
  try {
    const decoded = jwt.verify(token, config.JWT_TOKEN);
    console.log("🚀 ~ jwt.verify ~ decoded:", decoded);
    return decoded;
  } catch (err) {
    console.error("🚫 Invalid token:", err.message);
    return null; // or throw custom error
  }
}

}