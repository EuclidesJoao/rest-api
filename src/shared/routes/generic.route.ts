// File: generic.route.ts
import { Router } from "express";
import GenericController from "../controller/generic.controller";

class GenericRoute<T> {
  public readonly router = Router();
  protected controller: GenericController<T>;

  constructor(controller: GenericController<any>) {
    this.controller = controller;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.get("/", this.controller.findAll.bind(this.controller));
    this.router.get("/:id", this.controller.findById.bind(this.controller));
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
    this.router.put("/:id", this.controller.update.bind(this.controller));
  }
}

export default GenericRoute;
