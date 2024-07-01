
import { Router } from "express";
import equipeController from "../controllers/equipeController";
import { validateEquipe } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateEquipe, equipeController.createEquipe);
router.get("/", equipeController.getEquipe);
router.delete("/:id", equipeController.deleteEquipe);

export default router;
