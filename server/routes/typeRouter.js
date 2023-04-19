import { Router } from "express";
const router = new Router();
import typeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

router.get("/", typeController.getAll);
router.post("/", checkRoleMiddleware("ADMIN"), typeController.create);

export default router;
