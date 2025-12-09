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

  // File: generic.repository.ts

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    try {
      // 1. Check if data has any keys (to prevent updating nothing)
      const keys = Object.keys(data);
      if (keys.length === 0) {
        return this.findById(String(id)); // Or handle as a no-op update
      }

      const values = Object.values(data); // Create SET clause, placeholders start from $1
      const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", "); // Calculate the placeholder index for the ID. // It's the length of the values array + 1 (since array is 0-indexed, and placeholders are 1-indexed)
      const idPlaceholder = keys.length + 1;
      const query = `
        UPDATE ${this.table} 
        SET ${setClause} 
        WHERE ${this.primaryKey} = $${idPlaceholder} 
        RETURNING *
      `; // Combine update values and the ID for the query parameters
      const response = await pool.query(query, [...values, id]);

      return (response.rows[0] as T) || null;
    } catch (error) {
      throw new Error(`
        Failed to update record: ${
        error instanceof Error ? error.message : "Unknown Error"
      }`);
    }
  }
}

export default GenericRepository;
