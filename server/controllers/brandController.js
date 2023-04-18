import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class brandController {
    async create(request, response) {
        const { name } = request.body;
        const brand = await models.Brand.create({ name });
        return response.json(brand);
    }

    async getAll(request, response) {
        const brands = await models.Brand.findAll();
        return response.json(brands);
    }
}

export default new brandController();
