import { UserEntity } from "../schemas/auth.entity.js";

export  class AuthAdapter {
  //  adapt(data){
  //   const model = UserEntity.build({
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     phone: data.phone,
  //     address: data.address
  //   });
    
  //    return model;
  //  }

adapt(data) {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    image:data.image,
    phone: data.phone,
    role:data.role,
    isVerfied:data.isVerfied,
    address: data.address,
    status:data.status
  };
}


   adaptToPortalResponse(data) {
  const values = data?.dataValues ?? data;

  return {
    id: values.id,
    name: values.name,
    email: values.email,
    password: values.password,
    isVerified: values.isVerified,
    phone: values.phone,
    address: values.address,
    status: values.status,
    token : data.token ?? values.token
  };
}

  }
