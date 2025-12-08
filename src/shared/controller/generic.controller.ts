import { NextFunction, Request, Response } from "express";
import GenericService from "../services/generic.service";

class GenericController<T> {
  protected service: GenericService<T>;

  constructor(service: GenericService<T>) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }
}

export default GenericController;
