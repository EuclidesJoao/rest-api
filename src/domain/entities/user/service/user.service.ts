import UserRepository from "../repo/user.repository";
import GenericService from "../../../../shared/services/generic.service";
import { User } from "../../../../shared/types/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class UserService extends GenericService<User> {
  protected repository: UserRepository;

  constructor() {
    const userRepository = new UserRepository();
    super(userRepository);
  }

  async createUser(userData: User) {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        fk_role,
      } = userData;

      const existingUser = await this.repository.findByEmail(email);

      if (existingUser) {
        throw new Error("User with this email already exist");
      }

      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
      const passwordHash = await bcrypt.hash(password, salt);

      const userToCreate: User = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: passwordHash,
        fk_role: fk_role,
      };

      return await this.repository.create(userToCreate);
    } catch (error) {
      throw new Error(`
        Service error creating record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`)
    }
  }
}

export default UserService;
