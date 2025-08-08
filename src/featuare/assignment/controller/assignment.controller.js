import { assignmentEntity } from "../schema/assignment.schema.js";
import { BaseAPIService } from "../../../shared/services/base-api.service.js";

export class assignmentController {
 constructor(){
    this._baseApiService = new BaseAPIService(assignmentEntity)
 }

 async create(req , res){
  const createId = req.body;
  const items = await assignmentEntity.create(createId)
   return res.status(200).json({
    message :"assignment successfully",
    data:items
   })
 }

 async getAll(req , res){
   const items = await this._baseApiService.getAll();
   const totalpage = items.length;
   const limit = Math.min(1 , parseInt(req.query.page) || 10);
   const page = Math.min(1 , parseInt(req.query.limit) ||1);
   return res.status(200).json({
      success:true,
      message:"getAll assignment",
      totalcount : totalpage,
      totalpage: Math.ceil(limit / page),
      currentPage :page ,
      data : items
   })
 }
}