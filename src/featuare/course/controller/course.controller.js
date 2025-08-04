import { courseService } from "../service/course.service.js";
import { NotFoundError } from "../../../libs/core/error/custom-error.js";
import { ResponseHandler } from "../../../libs/core/api-responses/response.handler.js";
import { courseValidation } from "../validation/course.validation.js";
import { BadRequestError } from "../../../libs/core/error/custom-error.js";

export class courseController {
    constructor(){
        this._responseHandler = new ResponseHandler();
        this._service = new courseService()
    }

    async getAll(req , res){
        const searchText = req.query.search || ''; 
        const getAll = await this._service.getAllService(searchText);
        const result = await this._responseHandler.sendSuccess(res , getAll);
        return result;
    }

    async getMinPrice(req , res){
        const result = await this._service.getMinCoursePrice();
        const finalResult = await this._responseHandler.sendSuccess(res , result);
        return finalResult;
    }

    async getMinUserPerPrice(req , res){
        const result = await this._service.getMinCoursePriceUser();
        const  finalResult = await this._responseHandler.sendSuccess(res , result)
        return finalResult;
    }

    async getAllAgreecateUserPerPrice(req , res){
        const result = await this._service.getSumCourse();
        const finalResult = await this._responseHandler.sendSuccess(res , result);
        return finalResult;
    }

    async create(req , res , next){
        // const userIdFromToken = req.auth?.id;
        // if(!userIdFromToken){
        //     return next(new NotFoundError("user id not found in token") )
        // }
        const data= req.body;
        // data.userId = userIdFromToken
        const {error}= courseValidation.validate(req.body);
        if(error) {
            const simpleError = error.details.map(err =>({
                message : err.message,
                path:err.path
            }))

            return next(new BadRequestError("validation failed" , simpleError))
        }

        const courseCreate = await this._service.createService(data);
        const result = this._responseHandler.sendCreated(res ,courseCreate);
        return result;
    }
}