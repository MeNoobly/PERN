import ApiError from "../error/ApiError.js";

class userController {
    async registration(request, response) {}

    async login(request, response) {}

    async check(request, response, next) {
        const { id } = request.query;

        if (!id) {
            return next(ApiError.badRequest("Не задан ID"));
        }

        response.json(id);
    }
}

export default new userController();
