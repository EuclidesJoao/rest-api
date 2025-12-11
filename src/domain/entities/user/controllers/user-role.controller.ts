import GenericController from "../../../../shared/controller/generic.controller";
import { UserRole } from "../../../../shared/types/user";
import UserRoleService from "../service/user-role.service";

class UserRoleController extends GenericController<UserRole>{
    protected service : UserRoleService;

    constructor(){
        super(new UserRoleService())
    }
}

export default new UserRoleController()