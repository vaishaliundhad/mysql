import { DataTypes, Model } from "sequelize";
export class enrollmentEntity extends Model {
  static initModel(sequelize) {
    enrollmentEntity.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        courseId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "course",
            key: "id",
          },
        },
        enrolledAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("enrolled", "completed", "cancelled"),
          allowNull: true,
        },
        progress: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "enrollmentEntity",
        tableName: "enrollments",
        timestamps: true,
      }
    );
    return enrollmentEntity;
  }

  static associate(models) {
    enrollmentEntity.belongsTo(models.courseEntity, {
      as: "course",
      foreignKey: "courseId",
    }),
      enrollmentEntity.belongsTo(models.UserEntity, {
        as: "users",
        foreignKey: "userId",
      });
  }
}
