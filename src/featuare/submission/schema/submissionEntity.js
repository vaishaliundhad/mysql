import { DataTypes, Model } from "sequelize";

export class submissionEntity extends Model {
  static initModel(sequelize) {
    submissionEntity.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        assignment_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        file_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        submitted_at: {
          type: DataTypes.DATE,
          allowNull: false,submissionEntity,
          defaultValue: DataTypes.NOW,
        },
        marks: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        feedback: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "submissions",
        modelName: "submissionEntity",
        timestamps: true,
      }
    )

  }
  static associate(models){
     submissionEntity.belongsTo(models.UserEntity ,  {
      as:"users",
      foreignKey :"user_Id"
     }) 

     submissionEntity.belongsTo(models.assignmentEntity , {
      as:"assignments",
      foreignKey:"assignment_id"
     })
  }
}
