
import pool from "../config/dbConfig";

interface Avaliadores {
  id: number;
  nome: string;
  login: string;
  password: string;
}


class AvaliadoresModel {
  async create(user: Avaliadores): Promise<Avaliadores> {
    const { nome, login, password } =
      user;
    const result = await pool.query(
      "INSERT INTO avaliadores (nome, login, password) VALUES ($1, $2, $3) RETURNING *",
      [nome, login, password]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Avaliadores[] | null> {
    const result = await pool.query("SELECT * FROM avaliadores");
    return result.rows || null;
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM avaliadores WHERE id = $1", [id]);
  }
}

export { Avaliadores, AvaliadoresModel };


 