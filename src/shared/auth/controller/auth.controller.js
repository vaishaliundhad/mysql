import { ResponseHandler } from "../../../libs/core/api-responses/response.handler.js";
import { APP_MESSAGES } from "../../messages/app-message.js";
import { AuthService } from "../services/auth.service.js";
import { generateOTP } from "../../utils/utils.js";
import { otpTemplate } from "../../services/email/otpTemplate.js";
import { TokenAuthService } from "../../services/jwt-token.service.js";
import {
  BadRequestError,
  DuplicateEntityError,
  NotAuthorizedError,
  NotFoundError,
} from "../../../libs/core/error/custom-error.js";
import { authSchemaValidation } from "../validations/user.validation.js";
import { AuthAdapter } from "../adapters/auth-adapters.js";
import { sendEmail } from "../../utils/emailService.js";
import { OTPService } from "../services/otp.service.js";
import { loginSchemaValidation } from "../validations/login.validation.js";
import { UserEntity } from "../schemas/auth.entity.js";

export class AuthController {
  constructor() {
    this._Service = new AuthService();
    this._responseHandler = new ResponseHandler();
    this._adapter = new AuthAdapter();
    this._otpService = new OTPService();
    this._token = new TokenAuthService();
  }

  async login(req, res, next) {
    try {
      const { error, value } = loginSchemaValidation.validate(req.body, {
        abortEarly: false,
      });
      console.log("🚀 ~ AuthController ~ login ~ error:", error);
      if (error) {
        const details = error.details.map((d) => ({
          message: d.message,
          path: d.path.join("."),
        }));
        throw BadRequestError("validation failed", details);
      }
      const loginId = value;

      const newItem = await this._Service.checkUserEmailPassword(loginId);
      const tokenData = {
        id: newItem.id,
        email: newItem.email,
        role: newItem.role,
      };
      const token = await this._token.generateToken(tokenData, "10d");
      const data = { ...newItem, token };
      const result = await this._adapter.adaptToPortalResponse(data);

      this._responseHandler.sendSuccess(res, result);
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { error, value } = authSchemaValidation.validate(req.body, {
        abortEarly: false,
      });
      console.log("🚀 ~ AuthController ~ create ~ error:", error);
      console.log("Incoming body:", req.body);
      if (error) {
        const details = error.details.map((d) => ({
          message: d.message,
          path: d.path.join("."),
        }));
        throw new BadRequestError("validation failed", details);
      }

      const authModel = req.body;

      const userResult = await this._Service.findByEmail(authModel?.email);
      if (userResult) {
        throw new DuplicateEntityError(APP_MESSAGES.EMAIL_ALREADY_EXISTS);
      }

      const createUser = await this._Service.create(authModel);
      {
        1;
      }

      const otp = generateOTP();
      const subject = "Your otp code";
      const html = otpTemplate(otp);
      const result = await sendEmail({ to: authModel?.email, subject, html });
      if (result) {
        await this._otpService.storeOTP(authModel?.email, otp);
      }
      console.log("Storing OTP for:", authModel?.email, authModel?.mobileNo);

      this._responseHandler.sendOTP(res, { userId: createUser.id });
    } catch (error) {
      return next(error);
    }
  }

  async forgotPasswordRequestOTP(req, res) {
    const { email } = req.body;
    const user = await this._Service.findByEmail(email);
    if (!user) throw new error(APP_MESSAGES.USER_NOT_FOUND);

    const otp = generateOTP();
    const subject = "Your otp for password subject";
    const html = otpTemplate(otp, "use the OTP below to the reset");

    const result = await sendEmail({ to: email, subject, html });
    if (result) {
      await this._otpService.storeOTP(email, otp);
    }

    this._responseHandler.sendOTP(res)
  }

  async forgotPasswordReset(req , res){
    const {email , newPassword}= req.body;
    const user = await this._Service.findByEmail(email);
    if(!user) throw new NotFoundError(APP_MESSAGES.USER_NOT_FOUND)

      await this._Service.resetPassword(user.id , newPassword)
      this._responseHandler.sendUpdated(res , 
        {
          message: APP_MESSAGES.PASSWORD_UPDATED_SUCCESSFULLY
        }
      )
      
  }

  async updatedPassword(req ,res){
    const userId = req.params.id;
    const updatedId = req.body;
    const update = await this._Service.updatePassword(userId , updatedId);
    if(!update) throw new NotAuthorizedError(APP_MESSAGES.USER_NOT_FOUND);
    this._responseHandler.sendUpdated(res , update)
  }

  async verifyOtp(req, res) {
    const authModel = req.body;
    await this._otpService.verifyOTP(authModel.email, authModel.otp);
    this._responseHandler.VerifyOTP(res);
  }


}
