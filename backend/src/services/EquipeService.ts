import { Equipes, EquipeModel } from "../models/EquipeModel";

class equipeService {
  private equipeModel: EquipeModel;

  constructor() {
    this.equipeModel = new EquipeModel();
  }

  async createEquipe(equipeData: Equipes): Promise<Equipes> {
    return this.equipeModel.create(equipeData);
  }

  async getAllEquipes(): Promise<Equipes[] | null> {
    return this.equipeModel.findAll();
  }

  async deleteEquipe(id: number): Promise<void> {
    return this.equipeModel.delete(id);
  }
}

export default new equipeService();