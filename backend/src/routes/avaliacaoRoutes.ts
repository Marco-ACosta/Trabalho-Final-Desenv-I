import { Router } from "express";
import avaliacaoController from "../controllers/avaliacaoController";
import { validateAvaliacao } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateAvaliacao, avaliacaoController.createAvaliacao);
router.get("/", avaliacaoController.getAvaliacao);
router.delete("/:id", avaliacaoController.deleteAvaliacao);
router.put("/:id", avaliacaoController.updateAvaliacao);

export default router;

