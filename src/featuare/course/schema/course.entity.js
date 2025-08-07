import { DataTypes, Model } from "sequelize";
import { UserEntity } from "../../../shared/auth/schemas/auth.entity.js";

export class courseEntity extends Model{
    static initModel (sequelize){
        courseEntity.init({
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            userId:{
                type:DataTypes.UUID,
                allowNull:false,
                 references:{
                 model:"users",
                 key:"id"
               }
            },
            title:{
                type:DataTypes.STRING,
                allowNull:false
            },
            description:{
                type:DataTypes.STRING,
                allowNull:false
            },
            price:{
                type:DataTypes.FLOAT,
                allowNull:false
            },
            duration:{
                type:DataTypes.STRING,
                allowNull:false
            },
            level:{
                type:DataTypes.ENUM("beginner" , "intermediate" , "advanced"),
                allowNull:false
            },
            isActive:{
                type:DataTypes.BOOLEAN,
                allowNull:false
            }
        },
        {
        sequelize,
        modelName :"courseEntity",
        tableName :"course",
        timestamps:true
        }
       
        
    );

     return courseEntity;
    }

   static associate(model){
    courseEntity.belongsTo(model.UserEntity , {
        as:"users",
        foreignKey:"userId"
    })
   }
}