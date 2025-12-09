import { User } from "../../../../shared/types/user";
import UserService from "../service/user.service";
import GenericController from "../../../../shared/controller/generic.controller";


class UserController extends GenericController<User> {
  constructor() {
    super(new UserService());
  }
}

export default new UserController();
