import { Request, Response } from "express";
import avaliacaoService from "../services/avaliacaoService";

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoService.createAvaliacao(req.body);
      return res.status(201).json(avaliacoes);
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: "Error creating avaliacao" });
    }
  }

  async getAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoService.getAllAvaliacao();
      if (avaliacoes) {
        return res.status(200).json(avaliacoes);
      }
      return res.status(404).json({ error: "avaliacao not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching avaliacao" });
    }
  }

  async deleteAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      await avaliacaoService.deleteAvaliacao(Number(req.params.id));
      return res.status(200).json({ message: "avaliacao deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting avaliacao" });
    }
  }

  async updateAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacao = await avaliacaoService.updateAvaliacao(
        Number(req.params.id),
        req.body
      );
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      }
      return res.status(404).json({ error: "avaliacao not found" });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "Error updating avaliacao" });
    }
  }
}

export default new AvaliacaoController();