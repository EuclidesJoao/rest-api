import { Router } from "express";
import userRoutes from "../domain/entities/user/routes/user.routes";

const routes = Router()

routes.use('/users', userRoutes)

export default routes
