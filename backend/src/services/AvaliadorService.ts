import { Avaliadores, AvaliadoresModel } from "../models/AvaliadorModel";

class avaliadorService {
  private avaliadorModel: AvaliadoresModel;

  constructor() {
    this.avaliadorModel = new AvaliadoresModel();
  }

  async createAvaliador(avaliadorData: Avaliadores): Promise<Avaliadores> {
    return this.avaliadorModel.create(avaliadorData);
  }

  async getAllAvaliadores(): Promise<Avaliadores[] | null> {
    return this.avaliadorModel.findAll();
  }

  async deleteAvaliador(id: number): Promise<void> {
    return this.avaliadorModel.delete(id);
  }
}

export default new avaliadorService();