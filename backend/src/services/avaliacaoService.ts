import { Avaliacoes, Notas, AvaliacaoModel } from "../models/AvaliacaoModel";

class avaliacaoService {
  private avaliacaoModel: AvaliacaoModel;

  constructor() {
    this.avaliacaoModel = new AvaliacaoModel();
  }

  async createAvaliacao(avaliacaoData: Avaliacoes): Promise<Avaliacoes> {
    return this.avaliacaoModel.create(avaliacaoData);
  }

  async getAllAvaliacao(): Promise<Avaliacoes[] | null> {
    return this.avaliacaoModel.findAll();
  }

  async deleteAvaliacao(id: number): Promise<void> {
    return this.avaliacaoModel.delete(id);
  }

  async updateAvaliacao(id: number, notas: Notas): Promise<Avaliacoes | null> {
    return this.avaliacaoModel.update(id,notas);
  }

}


export default new avaliacaoService();