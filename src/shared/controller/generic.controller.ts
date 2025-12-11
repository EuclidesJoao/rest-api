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

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const results = await this.service.findAll();
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;

      if (typeof id !== "string") {
        res.status(400).json({ message: "ID parameter is required" });
        return;
      }

      const result = await this.service.findById(id);
      if (!result) {
        res.status(404).json({ message: "Record not found" });
        return;
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;

      if (typeof id !== "string") {
        res.status(400).json({ message: "ID parameter is required" });
        return;
      }

      const success = await this.service.delete(id);
      if (!success) {
        res.status(404).json({ message: "Record not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;

      if (typeof id !== "string") {
        res.status(400).json({ message: "ID parameter is required" });
        return;
      }

      console.log("THE ID OF RECORD BEING UPDATED: ", id);
      console.log("DATAS BEING UPDATED: ", data);

      const result = await this.service.update(id, data);

      if (!result) {
        res.status(404).json({ message: "Record not found" });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
export default GenericController;
