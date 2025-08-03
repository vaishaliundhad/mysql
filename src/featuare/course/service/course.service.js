import { courseEntity } from "../schema/course.entity.js";
import { BaseAPIService } from "../../../shared/services/base-api.service.js";
import { ResponseHandler } from "../../../libs/core/api-responses/response.handler.js";
import { courseAdapter } from "../../adapter/course.adapter.js";

export class courseService{
    constructor(){
        this._baseapiservice = new BaseAPIService(courseEntity);
         this._responseHandler = new ResponseHandler();
         this._adapter = new courseAdapter()

    }

    async createService(data){
        const adapter = await this._adapter.adapt(data)
        const createItem = await this._baseapiservice.create(adapter);
        return createItem;
    }
}