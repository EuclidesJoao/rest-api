// infrastructure/database/repositories/user.repository.ts
import { User } from "../../../../shared/types/user";
import GenericRepository from "../../../../shared/repo/generic.repository";
import { GenericConfig } from "../../../../shared/repo/generic.repository";
import pool from "../../../../infrastructure/database/data-source";

class UserRepository extends GenericRepository<User> {
  constructor() {
    const config: GenericConfig = {
      tableName: "users",
      primaryKey: "id",
    };
    super(config);
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const query = `SELECT * FROM ${this.table} WHERE email = $1 LIMIT 1`;
      const result = await pool.query(query, [email]);
      
      return (result.rows[0] as User) || null;
    } catch (error) {
      throw new Error(`
        Failed to find record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`);
    }
  }
}

export default UserRepository;
