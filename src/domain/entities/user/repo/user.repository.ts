// infrastructure/database/repositories/user.repository.ts
import { User } from "../../../../shared/types/user";
import GenericRepository from "../../../../shared/repo/generic.repository";
import { GenericConfig } from "../../../../shared/repo/generic.repository";

class UserRepository extends GenericRepository<User> {
  constructor() {
    const config: GenericConfig = {
      tableName: "users",
      primaryKey: "id"
    };
    super(config);
  }
}

export default UserRepository;