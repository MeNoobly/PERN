import { Router } from "express";
import userController from "../controllers/userController.js";
const router = new Router();
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);

export default router;
