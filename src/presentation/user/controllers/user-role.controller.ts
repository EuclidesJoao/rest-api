import { getController } from '../../../base/controller';
import { CreateUserRoleDTO } from './dtos/create-user-role.dto';
import userTypeService from '../services/user-type.service';


export class UserTypeController extends getController(
  userTypeService,
  CreateUserRoleDTO,
) {}
