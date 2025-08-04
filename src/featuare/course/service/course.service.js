import { courseEntity } from "../schema/course.entity.js";
import { BaseAPIService } from "../../../shared/services/base-api.service.js";
import { ResponseHandler } from "../../../libs/core/api-responses/response.handler.js";
import { courseAdapter } from "../../adapter/course.adapter.js";
import { Op, Sequelize } from "sequelize";

export class courseService {
  constructor() {
    this._baseapiservice = new BaseAPIService(courseEntity);
    this._responseHandler = new ResponseHandler();
    this._adapter = new courseAdapter();
  }

  async getAllService() {
    const getAll = await this._baseapiservice.getAll({
            where :{
                duration:{
                    [Op.like]:`%${searchText}%`
                }
            }
    });
    return getAll;
  }

  async getMinCoursePrice() {
    const coursePrice = await courseEntity.findOne({
      attributes: [[Sequelize.fn("min", Sequelize.col("price")), "minPrice"]],
    });
    return coursePrice;
  }

  async getMinCoursePriceUser() {
    const coursePrice = await courseEntity.findAll({
      attributes: [
        "userId",
        [Sequelize.fn("MAX", Sequelize.col("duration")), "minPrice"],
      ],
      group: ["userId"],
      raw: true,
    });
    return coursePrice;
  }

  async getSumCourse() {
    const courseSum = await courseEntity.findAll({
      where: {
        price: {
            [Op.lte]:900
        },
        duration:{
            [Op.gt]:5
        }
      },
      attributes: [
        "userId",
        [Sequelize.fn("SUM", Sequelize.col("price")), "sumPrice"],
        [Sequelize.fn("MIN", Sequelize.col("price")), "Price"],
        [Sequelize.fn("AVG", Sequelize.col("price")), "priceAvg"],
        [Sequelize.fn("MAX", Sequelize.col("duration")), "maxDuration"],
        [Sequelize.fn("AVG", Sequelize.col("duration")), "AvgDuration"],
        [Sequelize.fn("COUNT", Sequelize.col("duration")), "durationCount"],
      ],
      group: ["userId"],
      raw: true,
    });
    console.log("🚀 ~ courseService ~ getSumCourse ~ courseSum:", courseSum);
    return courseSum;
  }

  async createService(data) {
    const adapter = await this._adapter.adapt(data);
    const createItem = await this._baseapiservice.create(adapter);
    return createItem;
  }
}
