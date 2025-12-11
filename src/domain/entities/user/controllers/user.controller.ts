import { User } from "../../../../shared/types/user";
import { Request, Response, NextFunction } from "express";
import UserService from "../service/user.service";
import GenericController from "../../../../shared/controller/generic.controller";

class UserController extends GenericController<User> {
  protected service: UserService;

  constructor() {
    const service = new UserService()
    super(service);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { first_name, last_name, email, password, fk_role } = req.body;
      const userToCreate: User = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        fk_role: fk_role,
      };
      const result = await this.service.createUser(userToCreate);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

