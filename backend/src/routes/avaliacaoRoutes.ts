import { Router } from "express";
import avaliacaoController from "../controllers/avaliacaoController";

const router = Router();

router.post("/", avaliacaoController.createAvaliacao);
router.get("/", avaliacaoController.getAvaliacao);
router.delete("/:id", avaliacaoController.deleteAvaliacao);
router.put("/:id", avaliacaoController.updateAvaliacao);

export default router;

