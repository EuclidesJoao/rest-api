import { InsertResult, UpdateResult } from "typeorm";
import { getService } from "../../../base/service";
import { UserRoleEntity } from "../../../infrastructure/entities/user-roles.entity";
import { CreateUserRoleDTO } from "../controllers/dtos/create-user-role.dto";
import { AppDataSource } from "../../../infrastructure/database/data-source";
import { throwBadRequest } from "../../../base/middlewares/error-handler";

class UserRoleService extends getService(UserRoleEntity) {
  DESIGNACAO_FOUND_ERROR = `Já existe um tipo de usuário com esta designação.`;

  async findDesignation(designation: string) {
    const user_role_designation = await this.repository.findOne({
      where: { designation },
    });
    return user_role_designation;
  }

  async very_role(data: CreateUserRoleDTO | Partial<CreateUserRoleDTO>) {
    const { designacao = "" } = data;
    const found = await this.findDesignation(designacao);

    if (found) {
      throwBadRequest(this.DESIGNACAO_FOUND_ERROR);
    }
  }

  override async create(data: CreateUserRoleDTO): Promise<InsertResult> {
    await this.very_role(data);
    return super.create(data);
  }

  override async updateById(
    id: number,
    data: Partial<UserRoleEntity>
  ): Promise<UpdateResult> {
    await this.very_role(data)
    return super.updateById(id, data);
  }

  override async deleteById(id: number) {
    return super.deleteById(id);
  }
}

export default new UserRoleService(AppDataSource.getRepository(UserRoleEntity));
