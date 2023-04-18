import { Router } from "express";
const router = new Router();
import typeController from "../controllers/typeController.js";

router.get("/", typeController.getAll);
router.post("/", typeController.create);

export default router;
