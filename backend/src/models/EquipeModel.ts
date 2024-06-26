
import pool from "../config/dbConfig";

interface Equipes {
    id: number,
    nome: string
}

class EquipeModel {
    async create(user: Equipes): Promise<Equipes> {
      const { nome } =
        user;
      const result = await pool.query(
        "INSERT INTO avaliadores (nome) VALUES ($1) RETURNING *",
        [nome]
      );
      return result.rows[0];
    }
  
    async findAll(): Promise<Equipes[] | null> {
      const result = await pool.query("SELECT * FROM equipes");
      return result.rows || null;
    }
  
    async delete(id: number): Promise<void> {
      await pool.query("DELETE FROM equipes WHERE id = $1", [id]);
    }
  }


  export { Equipes, EquipeModel };
