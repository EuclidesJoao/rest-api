import GenericRepository from "../../../../shared/repo/generic.repository";
import { UserRole } from "../../../../shared/types/user";
import { GenericConfig } from "../../../../shared/repo/generic.repository";

class UserRoleRepository extends GenericRepository<UserRole>{
    constructor(){
        const config : GenericConfig = {
            tableName: "user_role",
            primaryKey: "id"
        }

        super(config)
    }
}

export default UserRoleRepository