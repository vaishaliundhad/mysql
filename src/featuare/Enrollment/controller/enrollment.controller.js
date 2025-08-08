import { Op, Sequelize } from "sequelize";
import { ResponseHandler } from "../../../libs/core/api-responses/response.handler.js";
import { BadRequestError } from "../../../libs/core/error/custom-error.js";
import { enrollmentEntity } from "../schema/enrollment.schema.js";
import { enrollmentService } from "../service/enrollment.service.js";
import { enrollmentSchema } from "../validation/enrollment.validation.js";
import { UserEntity } from "../../../shared/auth/schemas/auth.entity.js";
import { courseEntity } from "../../course/schema/course.entity.js";

export class enrollmentController {
  constructor() {
    this._service = new enrollmentService();
    this._responseHandler = new ResponseHandler();
  }

  // async createEnrollment(req , res , next){
  //     // const data = req.body;
  //     const {error , value} = enrollmentSchema.validate(req.body , {abortEarly:false  })
  //     if(error){
  //        const simpleError = error.details.map((d) =>({
  //            message : d.message,
  //            path:d.path
  //        }));
  //        console.log("🚀 ~ enrollmentController ~ createEnrollment ~ simpleError:", simpleError)
  //        return next(new BadRequestError("validation error" , simpleError))
  //     }
  //     const create = await this._service.(value);
  //     console.log("🚀 ~ enrollmentController ~ createEnrollment ~ create:", create)
  //     const result = await  this._responseHandler.sendCreated(res , create)
  //     return result;
  // }

  async create(req, res, next) {
    // const userIdFromToken = req.user?.id;
    // if(!userIdFromToken){
    //     return next(new NotFoundError("user id not found in token") )
    // }
    const data = req.body;
    // data.userId = userIdFromToken
    const { error } = enrollmentSchema.validate(req.body);
    console.log("🚀 ~ enrollmentController ~ create ~ error:", error);
    if (error) {
      const simpleError = error.details.map((err) => ({
        message: err.message,
        path: err.path,
      }));

      return next(new BadRequestError("validation failed", simpleError));
    }

    const courseCreate = await this._service.createService(data);
    console.log("🚀 ~ enrollmentController ~ create ~ courseCreate:", courseCreate)
    const result = this._responseHandler.sendCreated(res, courseCreate);
    return result;
  }

  async getAll(req, res) {
    const searchText = req.query.search || "";
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const createGetAll = await this._service.getAllService(
      searchText,
      sortBy,
      sortOrder
    );
    const totalEnrollment = createGetAll.length;
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const currenPage = Math.max(1, parseInt(req.query.page) || 1);

    return res.status(200).json({
      totalcount: totalEnrollment,
      totalpage: Math.ceil(limit / currenPage),
      currenPage,
      Enrollment: createGetAll,
    });
  }

  async getAllAverage(req, res) {
    const result = await this._service.getAllAverage();
    const finalResult = await this._responseHandler.sendSuccess(res, result);
    return finalResult;
  }

  async getUserByCourse(req, res) {
    const { courseId } = req.params;
    const users = await this._service.getUserByCourse(courseId);
    return res.status(200).json({
      courseId,
      totalUser: users.length,
      data: users,
    });
  }

  async getCoursesWithUserCount(req, res, minUser = "", searchText = "") { 
    const result = await enrollmentEntity.findAll({
      attributes   :[
        "courseId",
        [Sequelize.fn("COUNT" , Sequelize.col(userId) , "userCount")]
      ],
      where :{
        status :{
          [Op.like] : `%${searchText}%`
        }
      } ,
      include :[
        {
          model:UserEntity,
          as :"users",
        },
        {
          model :courseEntity,
          as :"course"
        }
      ],
      group:['courseId'],
      having:Sequelize.literal(`COUNT(userId) > ${minUser}`),

    })

    return res.status(200).json({
      message:"success",
      data : result
    })
  }

  async getByIdEnrollment (req , res){
    const result = req.params.id;
    const finalResult = await enrollmentEntity.findByPk(result);
    return await this._responseHandler.sendSuccess(res , finalResult)
  }

  async getByUpdateEnrollment(req , res){
    const items = req.body;
    const result = req.params.id;
    const finalResult = await enrollmentEntity.update(items , {
      where :{id :result}
    });
  
    const update = await enrollmentEntity.findByPk(result)

    return await this._responseHandler.sendUpdatede(res , update);
    // return res.status(200).json({
    //   message:"updateeeeeeeeeeee successfully",
    //   data : update
    // })
  }

  async getDeleteEnrollment(req , res){
    const result = req.params.id;
    const finalResult = await enrollmentEntity.drop(result);
    return await this._responseHandler.sendSuccess(res , finalResult)
  }
}
