

import { Sequelize } from 'sequelize';
import { DB_CONFIG } from '../../config/config.js';
import { UserEntity } from '../../shared/auth/schemas/auth.entity.js';
import { OtpEntity } from '../../shared/auth/schemas/otp.entity.js';

export const sequelize = new Sequelize(
  DB_CONFIG.DB,
  DB_CONFIG.USER,
  DB_CONFIG.PASSWORD,
  {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.DIALECT,
    logging: false,
  }

);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully!');

    // Initialize models
    UserEntity.initModel(sequelize);
    OtpEntity.initModel(sequelize);

    await sequelize.sync({ alter: true });
    console.log('✅ Models initialized and synced');
  } catch (error) {
    console.error('❌ Unable to connect to MySQL:', error);
  }
};
