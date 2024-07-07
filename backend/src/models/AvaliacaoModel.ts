
import pool from "../config/dbConfig";

interface Notas {
  [key: string]: number;
}

interface Avaliacoes {
    id: number,
    avaliador_id: number,
    equipe_id: number,
    notas: Notas
}

class AvaliacaoModel {
    async create(avaliacao: Avaliacoes): Promise<Avaliacoes> {
      const { avaliador_id, equipe_id, notas} =
      avaliacao;
      const result = await pool.query(
        "INSERT INTO avaliacoes (avaliador_id, equipe_id, notas) VALUES ($1, $2, $3) RETURNING *",
        [avaliador_id, equipe_id, notas]
      );
      return result.rows[0];
    }
  
    async findAll(): Promise<Avaliacoes[] | null> {
      const result = await pool.query("SELECT * FROM avaliacoes");
      return result.rows || null;
    }
  
    async update(id: number, notas: Notas): Promise<Avaliacoes | null> {
      const query = "UPDATE avaliacoes SET notas = $1 WHERE id = $2 RETURNING *";
      const values = [notas, id];
  
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    }
  
    async delete(id: number): Promise<void> {
      await pool.query("DELETE FROM avaliacoes WHERE id = $1", [id]);
    }

  }

  export { Avaliacoes, Notas, AvaliacaoModel };