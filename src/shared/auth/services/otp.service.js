// src/shared/auth/services/otp.service.js
import { BaseAPIService } from '../../services/base-api.service.js';
import { UserEntity } from '../schemas/auth.entity.js';
import { OtpEntity } from '../schemas/otp.entity.js';
import { NotAuthorizedError } from '../../../libs/core/error/custom-error.js';
import { APP_MESSAGES } from '../../messages/app-message.js';

export class OTPService {
  constructor() {
    this._userService = new BaseAPIService(UserEntity);
    this._otpService = new BaseAPIService(OtpEntity);
  }

  async storeOTP(email ,  otp) {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    const existingOTP = await this._otpService.findOne({ email });
    if (existingOTP) {
      existingOTP.otp = otp;
      existingOTP.expiresAt = expiresAt;
      // existingOTP.mobileNo = mobileNo;
      await existingOTP.save();
    } else {
      await this._otpService.create({ email, otp, expiresAt });
    }
  }

  async verifyOTP(email, inputOTP) {
    const otpRecord = await OtpEntity.findOne({
      email,
      otp: inputOTP,
      expiresAt: { $gte: new Date() }
    });

    if (!otpRecord) {
      throw new NotAuthorizedError(APP_MESSAGES.INVALID_OR_EXPIRED_OTP);
    }

    const user = await this._userService.findOne({ email });
    if (!user) {
      throw new NotAuthorizedError(APP_MESSAGES.USER_NOT_FOUND || 'User not found');
    }

    user.isVerified = true;
    await user.save();
    await this._otpService.deleteMany({ email });

    return user;
  }
}
