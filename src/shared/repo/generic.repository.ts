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

  async findAll(): Promise<T[]> {
    try {
      const query = `SELECT * FROM ${this.table}`;
      const result = await pool.query(query);
      return result.rows as T[];
    } catch (error) {
      console.error(`Error fetching records from ${this.table}:`, error);
      throw new Error(`
        Failed to fetch records: ${
          error instanceof Error ? error.message : "Unknown Error"
        }
        `);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const query = `SELECT * FROM ${this.table} WHERE ${this.primaryKey}=$1 LIMIT 1`;
      const result = await pool.query(query, [id]);
      return (result.rows[0] as T) || null;
    } catch (error) {
      throw new Error(`
        Failed to fetch record: ${
          error instanceof Error ? error.message : "Unknown Error"
        }
        `);
    }
  }



  async delete(id: string | number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM ${this.table}
        WHERE ${this.primaryKey} = $1;
      `;
      const result = await pool.query(query, [id]);
      return typeof result.rowCount === "number" && result.rowCount > 0;
    } catch (error) {
      console.error(`Error deleting record from ${this.table}:`, error);
      throw new Error(
        `Failed to delete record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const keys = Object.keys(data);

      if (keys.length === 0) {
        throw new Error("No fields provided for update");
      }

      const setQuery = keys
        .map((key, index) => `"${key}" = $${index + 1}`)
        .join(", ");

      const values = Object.values(data);

      const query = `
      UPDATE ${this.table}
      SET ${setQuery}
      WHERE id = $${keys.length + 1}
      RETURNING *;
    `;

      const result = await pool.query(query, [...values, id]);

      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Failed to update record: ${error.message}`);
    }
  }
}

export default GenericRepository;
