import UserRoleRepository from "../repo/user-role.repository";
import GenericService from "../../../../shared/services/generic.service";
import { UserRole } from "../../../../shared/types/user";



class UserRoleService extends GenericService<UserRole>{
    protected repository: UserRoleRepository

    constructor(){
        const userRoleRepository = new UserRoleRepository()
        super(userRoleRepository)
    }
}

export default UserRoleService