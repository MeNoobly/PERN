import ApiError from "../error/ApiError.js";
import models from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJWt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class userController {
    async registration(request, response, next) {
        const { email, password, role } = request.body;

        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или пароль"));
        }

        const candidate = await models.User.findOne({ where: { email } });

        if (candidate) {
            return next(
                ApiError.badRequest("Пользователь с таким email уже существует")
            );
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await models.User.create({
            email,
            role,
            password: hashPassword,
        });
        const basket = await models.Basket.create({ userId: user.id });
        const token = generateJWt(user.id, user.email, user.role);
        return response.json({ token });
    }

    async login(request, response, next) {
        const { email, password } = request.body;
        const user = await models.User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.internal("Пользователь не найден"));
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль"));
        }

        const token = generateJWt(user.id, user.email, user.role);
        return response.json({ token });
    }

    async check(request, response, next) {
        const token = generateJWt(
            request.user.id,
            request.user.email,
            request.user.role
        );

        return response.json({ token });
    }
}

export default new userController();
