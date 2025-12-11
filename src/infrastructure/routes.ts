import { Router } from "express";
import userRoutes from "../domain/entities/user/routes/user.routes";
import userRoleRoutes from "../domain/entities/user/routes/user-role.routes";

const routes = Router()

routes.use('/users', userRoutes)
routes.use("/user-roles", userRoleRoutes)

export default routes
