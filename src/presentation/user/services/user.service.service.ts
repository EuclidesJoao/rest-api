import { UserEntity } from '../../../infrastructure/entities/user.entity';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { getService } from '../../../base/service';
import { CreateUserDTO } from '../controllers/dtos/create-user.dto';
import userRoleService from './user-role.service';
import bcrypt from 'bcrypt';
import { throwBadRequest, throwNotFound } from '../../../base/middlewares/error-handler';

class UserService extends getService(UserEntity, CreateUserDTO) {
  EMAIL_FOUND_ERROR_MESSAGE = `Este email já está associado a uma conta.`;
  PHONE_NUMBER_FOUND_ERROR_MESSAGE = `Este número de telefone já está associado a uma conta.`;
  USER_TYPE_NOT_FOUND_ERROR_MESSAGE = `O tipo de usuário passado não existe`;

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const user = await this.repository.findOne({ where: { phoneNumber } });
    return user;
  }

  async verifyEmail(data: CreateUserDTO | Partial<CreateUserDTO>) {
    const { email = '' } = data;
    const found = await this.findByEmail(email);

    if (found) {
      throwBadRequest(this.EMAIL_FOUND_ERROR_MESSAGE);
    }
  }

  async verifyPhoneNumber(data: CreateUserDTO | Partial<CreateUserDTO>) {
    const { phoneNumber = '' } = data;
    const found = await this.findByPhoneNumber(phoneNumber);

    if (found) {
      throwBadRequest(this.PHONE_NUMBER_FOUND_ERROR_MESSAGE);
    }
  }

  async verifyUserType(data: CreateUserDTO | Partial<CreateUserDTO>) {
    const { fkUserType } = data;
    if (fkUserType) {
      const found = await userRoleService.findById(fkUserType);

      if (!found) {
        throwNotFound(this.USER_TYPE_NOT_FOUND_ERROR_MESSAGE);
      }
    }
  }

  async encryptPassword(data: CreateUserDTO | Partial<CreateUserDTO>) {
    const { password } = data;
    if (password) {
      const saltOrRounds = 10;
      const encryptedPassword = await bcrypt.hash(password, saltOrRounds);

      Object.assign(data, { password: encryptedPassword });
    }
  }

  override async create(data: CreateUserDTO) {
    await this.verifyUserType(data);
    await this.verifyPhoneNumber(data);
    await this.verifyEmail(data);
    await this.encryptPassword(data);

    return await super.create(data);
  }

  override async updateById(id: number, data: CreateUserDTO) {
    await this.verifyUserType(data);
    await this.verifyPhoneNumber(data);
    await this.verifyEmail(data);
    await this.encryptPassword(data);

    return await super.updateById(id, data);
  }
}

export default new UserService(AppDataSource.getRepository(UserEntity));
