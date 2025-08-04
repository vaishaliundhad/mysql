// src/shared/services/base-api.service.js
export class BaseAPIService {
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      return this.model.create(data);
    }

    async getAll(data){
      return this.model.findAll(data)
    }
  
    async findOne(where) {
      return this.model.findOne({ where });
    }
  
    async deleteMany(where) {
      return this.model.destroy({ where });
    }
  }
  