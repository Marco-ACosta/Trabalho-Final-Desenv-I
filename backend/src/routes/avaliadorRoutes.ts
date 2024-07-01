
import { Router } from "express";
import avaliadorController from "../controllers/avaliadorController";
import { validateAvaliador } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateAvaliador, avaliadorController.createAvaliador);
router.get("/", avaliadorController.getAvaliadores);
router.delete("/:id", avaliadorController.deleteAvaliador);

export default router;

