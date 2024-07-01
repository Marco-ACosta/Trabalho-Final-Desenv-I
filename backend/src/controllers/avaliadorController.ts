import { Request, Response } from "express";
import avaliadorService from "../services/AvaliadorService";

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliador = await avaliadorService.createAvaliador(req.body);
      return res.status(201).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: "Error creating avaliador" });
    }
  }

  async getAvaliadores(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadores = await avaliadorService.getAllAvaliadores();
      if (avaliadores) {
        return res.status(200).json(avaliadores);
      }
      return res.status(404).json({ error: "avaliadores not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching avaliador" });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      await avaliadorService.deleteAvaliador(Number(req.params.id));
      return res.status(200).json({ message: "Avaliador deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting Avaliador" });
    }
  }
}

export default new AvaliadorController();