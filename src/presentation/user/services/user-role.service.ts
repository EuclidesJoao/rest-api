import { UserRole } from '../../../domain/entities/user-roles.entity';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { getService } from '../../base/service';
import { throwBadRequest } from '../../../base/middlewares/error-handler';
import { CreateUserTypeDTO } from '../controllers/dtos/create-user-type.dto';
import { InsertResult, UpdateResult } from 'typeorm';

class UserRoleService extends getService(UserRole, CreateUserTypeDTO) {
  DESIGNACAO_FOUND_ERROR = `Já existe um tipo de usuário com esta designação.`;

  async findByDesignation(designation: string) {
    const userType = await this.repository.findOne({ where: { designation } });
    return userType;
  }

  async verifyDesignation(
    data: CreateUserTypeDTO | Partial<CreateUserTypeDTO>,
  ) {
    const { designation = '' } = data;
    const found = await this.findByDesignation(designation);

    if (found) {
      throwBadRequest(this.DESIGNACAO_FOUND_ERROR);
    }
  }

  override async create(data: CreateUserTypeDTO): Promise<InsertResult> {
    await this.verifyDesignation(data);
    return await super.create(data);
  }

  override async updateById(
    id: number,
    data: Partial<UserRole>,
  ): Promise<UpdateResult> {
    await this.verifyDesignation(data);
    return await super.updateById(id, data);
  }
}

export default new UserTypeService(AppDataSource.getRepository(UserRole));
