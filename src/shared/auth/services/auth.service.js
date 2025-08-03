import { hash } from "crypto";
import {
  BadRequestError,
  NotAuthorizedError,
} from "../../../libs/core/error/custom-error.js";
import { APP_MESSAGES } from "../../messages/app-message.js";
import { BaseAPIService } from "../../services/base-api.service.js";
import { AuthAdapter } from "../adapters/auth-adapters.js";
import { UserEntity } from "../schemas/auth.entity.js";
import bcrypt from "bcrypt";

export class AuthService {
  constructor() {
    this._adapter = new AuthAdapter();
    this._baseService = new BaseAPIService(UserEntity);
  }

  async findByEmail(email) {
    try {
      return await UserEntity.findOne({ where: { email } });
    } catch (error) {
      console.error("Error in findByEmail:", error.message, error.stack);
      throw new Error(`Failed to query user by email: ${error.message}`);
    }
  }

  async checkUserEmailPassword(auth) {
    const { email, password } = auth;
    const user = await UserEntity.findOne({
      where: {
        email: email?.toLowerCase(),
      },
    });

    if (!user) {
      await NotAuthorizedError(APP_MESSAGES.USER_NOT_FOUND);
    }
    if (!user.password) {
      throw new Error("User password is missing in the database");
    }

    const isPaswordValid = await bcrypt.compare(password, user.password);
    if (!isPaswordValid) {
      await NotAuthorizedError(APP_MESSAGES.INVALID_EMAIL);
    }

    return user;
  }

  async resetPassword(id, newPassword) {
    const user = await UserEntity.findOne({ where: { id } });
    if (!user) throw new NotAuthorizedError(APP_MESSAGES.USER_NOT_FOUND);
    const salt = await bcrypt.genSaltSync(10, "a");
    const hashedPassword = await bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
  }

  async updatePassword(id, updatedId) {
    const { newPassword } = updatedId;
    if (!updatedId || !newPassword) {
      throw new BadRequestError("new password is required");
    }

    const user = await UserEntity.findOne({ where: { id } });
    if (!user) throw new NotAuthorizedError(APP_MESSAGES.USER_NOT_FOUND);

    const salt = bcrypt.genSaltSync(10, 'a');
    const hashedPassword =  bcrypt.hashSync(updatedId.newPassword , salt);

    user.password = hashedPassword;
    await user.save();

    return true;
  }

  async create(data) {
    return UserEntity.create(data);
  }
}
