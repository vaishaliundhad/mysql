import { DataTypes, Model } from "sequelize";

export class assignmentEntity extends Model {
  static initModel(sequelize) {
    assignmentEntity.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        course_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        due_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        created_by: {
          type: DataTypes.UUID, 
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "assignments",
        modelName: "assignmentEntity",
        timestamps: true, 
      }
    );
  }
}
