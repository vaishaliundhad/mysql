import { DB_CONFIG } from "../../config/config.js";
import jwt  from 'jsonwebtoken';

export class TokenAuthService {
    generateToken(user , expireIndays){
       const userObj = user;
       const token = jwt.sign(userObj , DB_CONFIG.TOKEN , {
        expiresIn : expireIndays
       })
       return token;
    }

    validateToken(tokenObj){
        const {token} = tokenObj;
        return jwt.verify(token , DB_CONFIG.TOKEN)
    }
}