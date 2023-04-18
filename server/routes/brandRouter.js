import { Router } from "express";
const router = new Router();
import brandController from "../controllers/brandController.js";

router.get("/", brandController.getAll);
router.post("/", brandController.create);

export default router;
