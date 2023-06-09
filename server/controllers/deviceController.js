import { v4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class deviceController {
    async create(request, response, next) {
        try {
            let { name, price, brandId, typeId, info } = request.body;
            const { img } = request.files;
            const __dirname = path.dirname(fileURLToPath(import.meta.url));

            let fileName = v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

            const device = await models.Device.create({
                name,
                price,
                brandId,
                typeId,
                img: fileName,
            });

            if (info) {
                info = JSON.parse(info);
                info.forEach((item) => {
                    models.DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id,
                    });
                });
            }

            return response.json(device);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(request, response) {
        try {
            let { brandId, typeId, limit, page } = request.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let devices;

            if (!brandId && !typeId) {
                devices = await models.Device.findAndCountAll({
                    limit,
                    offset,
                });
            }

            if (brandId && !typeId) {
                devices = await models.Device.findAndCountAll({
                    where: { brandId },
                    limit,
                    offset,
                });
            }

            if (!brandId && typeId) {
                devices = await models.Device.findAndCountAll({
                    where: { typeId },
                    limit,
                    offset,
                });
            }

            if (brandId && typeId) {
                devices = await models.Device.findAndCountAll({
                    where: { brandId, typeId },
                    limit,
                    offset,
                });
            }

            return response.json(devices);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getOne(request, response) {
        const { id } = request.params;
        const device = await models.Device.findOne({
            where: { id },
            include: [{ model: models.DeviceInfo, as: "info" }],
        });

        return response.json(device);
    }
}

export default new deviceController();
