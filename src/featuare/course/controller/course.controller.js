import { courseService } from "../service/course.service.js";
import { NotFoundError } from "../../../libs/core/error/custom-error.js";
import { ResponseHandler } from "../../../libs/core/api-responses/response.handler.js";

export class courseController {
    constructor(){
        this._responseHandler = new ResponseHandler();
        this._service = new courseService()
    }

    async create(req , res){
        const data= req.body;
        const userIdFromToken = req.user?.id;
        if(!userIdFromToken){
            return next(new NotFoundError("user id not found in token") )
        }
        data.userId = userIdFromToken
        const courseCreate = this._service.createService(data);
        const result = this._responseHandler.sendCreated(res ,courseCreate);
        return result;
    }
}