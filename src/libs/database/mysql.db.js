import { Sequelize } from "sequelize";
import { courseEntity } from "../../featuare/course/schema/course.entity.js";
import { UserEntity } from "../../shared/auth/schemas/auth.entity.js";
import { OtpEntity } from "../../shared/auth/schemas/otp.entity.js";
import { enrollmentEntity } from "../../featuare/Enrollment/schema/enrollment.schema.js";

export const sequelize = new Sequelize(
  "courseProject",
  "root",
  "adminUser@123",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// export const sequelize = new Sequelize(
//   DB_CONFIG.DB,
//   DB_CONFIG.USER,
//   DB_CONFIG.PASSWORD,
//   {
//     host: DB_CONFIG.HOST,
//     port: DB_CONFIG.PORT,
//     dialect: DB_CONFIG.DIALECT,
//     logging: false,
//   }
// );

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully!");

    // Initialize models
    UserEntity.initModel(sequelize);
    OtpEntity.initModel(sequelize);
    courseEntity.initModel(sequelize);
    enrollmentEntity.initModel(sequelize);
    courseEntity.associate({UserEntity})
    enrollmentEntity.associate({ courseEntity , UserEntity });

    await sequelize.sync();
    console.log("✅ Models initialized and synced");
  } catch (error) {
    console.error("❌ Unable to  to MySQL:", error);
  }
};
