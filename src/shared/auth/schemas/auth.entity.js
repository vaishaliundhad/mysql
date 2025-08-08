import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

export class UserEntity extends Model {
  static initModel(sequelize) {
    UserEntity.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role:{
          type:DataTypes.ENUM('admin' , 'user' , 'instructor'),
          allowNull:true,
          defaultValue:'user'
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "UserEntity",
        tableName: "users",
        hooks: {
          beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          },
        },
      }
    );

    return UserEntity;
  }
}
