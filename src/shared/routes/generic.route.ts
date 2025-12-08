// File: generic.route.ts
import { Router } from "express";
import GenericController from "../controller/generic.controller";

class GenericRoute<T> {
    public readonly router = Router();
    protected controller: GenericController<T>; 

    constructor(controller: GenericController<any>) {
        this.controller = controller;
        this.initializeRoutes(); // Crucial: Initialize routes immediately
    }

    protected initializeRoutes(): void {
        this.router.post("/", this.controller.create);
        this.router.delete("/", this.controller.delete)
    }
}

export default GenericRoute;
