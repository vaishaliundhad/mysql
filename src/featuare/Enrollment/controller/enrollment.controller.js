import { ResponseHandler } from "../../../libs/core/api-responses/response.handler.js";
import { BadRequestError } from "../../../libs/core/error/custom-error.js";
import { enrollmentService } from "../service/enrollment.service.js";
import { enrollmentSchema } from "../validation/enrollment.validation.js";

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

  async getAllAverage(req , res){
    const result = await this._service.getAllAverage();
    const finalResult = await this._responseHandler.sendSuccess(res  , result);
    return finalResult
  }
}
