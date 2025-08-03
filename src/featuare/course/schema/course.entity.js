import { DataTypes, Model } from "sequelize";

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
                allowNull:true,
               references:{
                model:"user",
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
        sequelize,
        modelName ="courseEntity",
        tableName ="courses"
        
    );

     return courseEntity;
    }
}