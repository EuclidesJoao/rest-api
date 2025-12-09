import UserRepository from "../repo/user.repository";
import GenericService from "../../../../shared/services/generic.service";
import { User } from "../../../../shared/types/user";

class UserService extends GenericService<User>{
    protected repository: UserRepository;

    constructor() {
        const userRepository = new UserRepository();
        super(userRepository);
    }
}

export default UserService;
