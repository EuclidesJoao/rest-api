import pool from "../../infrastructure/database/data-source";

export type GenericConfig = {
  tableName: string;
  primaryKey: string;
};

class GenericRepository<T> {
  protected table: string;
  protected primaryKey: string;

  constructor({ tableName, primaryKey }: GenericConfig) {
    this.table = tableName;
    this.primaryKey = primaryKey;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const columns = keys.join(", ");
      const placeholders = keys.map((_, index) => `$${index + 1}`).join(", ");
      const query = `
        INSERT INTO ${this.table} (${columns}) 
        VALUES (${placeholders}) 
        RETURNING *
      `;
      const result = await pool.query(query, values);
      return result.rows[0] as T;
    } catch (error) {
      console.error(`Error creating record in ${this.table}:`, error);
      throw new Error(
        `Failed to create record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
  async delete() {
    try {
    } catch (error) {}
  }
}

export default GenericRepository;
