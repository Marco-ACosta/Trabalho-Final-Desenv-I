
import pool from "../config/dbConfig";

interface Avaliacoes {
    id: number,
    avaliador_id: number,
    equipe_id: number,
    notas: string
}

class AvaliacaoModel {
    async create(user: Avaliacoes): Promise<Avaliacoes> {
      const { avaliador_id, equipe_id, notas} =
        user;
      const result = await pool.query(
        "INSERT INTO users (name, login, password, email, profile, cpf, birthdate, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [avaliador_id, equipe_id, notas]
      );
      return result.rows[0];
    }
  
    async findAll(): Promise<Avaliacoes[] | null> {
      const result = await pool.query("SELECT * FROM avaliacoes");
      return result.rows || null;
    }
  
    async update(id: number, user: Partial<Avaliacoes>): Promise<Avaliacoes | null> {
      const fields: string[] = [];
      const values: any[] = [];
      let query = "UPDATE users SET ";
  
      Object.keys(user).forEach((key, index) => {
        fields.push(`${key} = $${index + 1}`);
        values.push((user as any)[key]);
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