import { submissionEntity } from "../schema/submissionEntity.js";
import { BaseAPIService } from "../../../shared/services/base-api.service.js";
import { UserEntity } from "../../../shared/auth/schemas/auth.entity.js";
import { assignmentEntity } from "../../assignment/schema/assignment.schema.js";
export class submissionController {
  constructor() {
    this._baseApiService = new BaseAPIService(submissionEntity);
  }

  async create(req, res) {
    const createId = req.body;
    const items = await submissionEntity.create(createId);
    return res.status(200).json({
      message: "assignment successfully",
      data: items,
    });
  }

  async getAll(req, res) {
    const items = await this._baseApiService.getAll({
      include: [
        {
          model:UserEntity,
          as: "users",
          attributes :["id" , "name" , "email" , "role"]
        },
        {
         model : assignmentEntity ,
         as :"assignments",
         attributes :["id" , "title" , "description"]
        }
      ],
    });
    const totalpage = items.length;
    const limit = Math.min(1, parseInt(req.query.page) || 10);
    const page = Math.min(1, parseInt(req.query.limit) || 1);
    const offset = (page - 1) * limit;
    return res.status(200).json({
      success: true,
      message: "getAll submission",
      totalcount: totalpage,
      totalpage: Math.ceil(limit / page),
      currentPage: page,
      data: items,
    });
  }

  
}
