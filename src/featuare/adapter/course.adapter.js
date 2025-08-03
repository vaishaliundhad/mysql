
export class courseAdapter{
    adapt(data){
        return{
           title:data.title,
           description:data.description,
           price:data.price,
           duration:data.duration,
           level:data.level,
           isActive:data.isActive
        }
    }
}