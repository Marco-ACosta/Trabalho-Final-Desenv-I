
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
        "INSERT INTO users (avaliador_id, equipe_id, notas) VALUES ($1, $2, $3) RETURNING *",
        [avaliador_id, equipe_id, JSON.stringify(notas)]
      );
      return result.rows[0];
    }
  
    async findAll(): Promise<Avaliacoes[] | null> {
      const result = await pool.query("SELECT * FROM avaliacoes");
      return result.rows || null;
    }
  
    async update(id: number, avaliacao: Partial<Avaliacoes>): Promise<Avaliacoes | null> {
      const fields: string[] = [];
      const values: any[] = [];
      let query = "UPDATE users SET ";
  
      Object.keys(avaliacao).forEach((key, index) => {
        fields.push(`${key} = $${index + 1}`);
        values.push((avaliacao as any)[key]);
      });
  
      query +=
        fields.join(", ") +
        " WHERE id = $" +
        (fields.length + 1) +
        " RETURNING *";
      values.push(id);
  
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    }
  
    async delete(id: number): Promise<void> {
      await pool.query("DELETE FROM users WHERE id = $1", [id]);
    }
  }

  export { Avaliacoes, AvaliacaoModel };