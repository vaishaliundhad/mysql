import { DataTypes , Model } from "sequelize";


export class OtpEntity  extends Model{
    static initModel(sequelize) {
        OtpEntity.init({
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true

         },
         email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
         },
         mobileNo:{
            type:DataTypes.STRING,
            allowNull:true
         },
         otp:{
             type:DataTypes.STRING,
             allowNull:false
         },
         expiresAt:{
            type:DataTypes.DATE,
            allowNull:true
         }
        },
        {
            sequelize,
            tableName:"otp",
            timestamps:true
        }
    
    )
    }
}

// import { DataTypes, Model } from 'sequelize';

// export class OtpEntity extends Model {
//   static initModel(sequelize) {
//     OtpEntity.init(
//       {
//         email: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         otp: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         expiredAt: {
//           type: DataTypes.DATE,
//           allowNull: false,
//         },
//       },
//       {
//         sequelize,
//         modelName: 'OtpEntity',
//         tableName: 'otps',
//         timestamps: true,
//       }
//     );
//   }
// }
