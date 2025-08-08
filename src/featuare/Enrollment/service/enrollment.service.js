import { enrollmentEntity } from "../schema/enrollment.schema.js";
import { BaseAPIService } from "../../../shared/services/base-api.service.js";
import { courseEntity } from "../../course/schema/course.entity.js";
import { UserEntity } from "../../../shared/auth/schemas/auth.entity.js";
import { enrollmentAdapter } from "../adapter/enrollment.adapter.js";
import { Op, Sequelize } from "sequelize";

export class enrollmentService {
  constructor() {
    this._baseapiservice = new BaseAPIService(enrollmentEntity);
    this._adapter = new enrollmentAdapter();
  }

  async createService(data) {
    const adapter = await this._adapter.adapt(data);
    const createItem = await this._baseapiservice.create(adapter);
    return createItem;
  }

  async getAllService(searchText = "", sortBy = "", sortOrder = "") {
    const getAll = await this._baseapiservice.getAll({
      where: {
        [Op.or]: [
          {
            status: {
              [Op.like]: `%${searchText}%`,
            },
          },
          {
            progress: {
              [Op.like]: `%${searchText}%`,
            },
          },
          {
            courseId :{
              [Op.like]:`%${searchText}%`
            }
          }
        ],
      },

      order: sortBy && sortOrder ? [[sortBy, sortOrder]] : undefined,
      include: [
        {
          model: UserEntity,
          as: "users",
          attributes: ["id", "name", "email", "password", "role"],
        },
        {
          model: courseEntity,
          as: "course",
          attributes: ["id", "title", "description", "price"],
        },
      ],
    });
    return getAll;
  }

  async getUserByCourse(courseId) {
    const enrollment = await enrollmentEntity.findAll({
      where: {
        courseId,
      },
      include: [{ 
        model: UserEntity ,
        as:"users",
        attributes :['id' , "name" , "email" , "role"]
       },
       {
        model :courseEntity,
        as:"course",
        attributes :["id" , "title" , "description"]
       }
      ],
    }) 

  return enrollment.map( e => e.users)
  }
     
  async getAllAverage() {
    const enrollment = await enrollmentEntity.findAll({
      attributes: [
        "userId",
        [Sequelize.fn("AVG", Sequelize.col("progress")), "average"],
      ],
      group: ["userId"],
    });

    return enrollment;
  }

  


}
