import { IService } from './interface/IService';
import { Request, Response, NextFunction } from 'express';

export function getController<
  Service extends IService,
  DTOClass extends object,
>(service: Service, dtoClass: new () => DTOClass) {
  class Controller {
    static async find(
      request: Request,
      response: Response,
      next: NextFunction,
    ) {
      let data;
      const { pageNumber, rowsNumber, searchTerm } = request.query;
      try {
        if (pageNumber && rowsNumber) {
          data = await service.find(
            Number.parseInt(pageNumber.toString()),
            Number.parseInt(rowsNumber.toString()),
            searchTerm?.toString(),
          );
        } else {
          data = await service.findAll(searchTerm?.toString());
        }
      } catch (error) {
        console.log(error);
        next(error);
      }
      return response.status(200).json(data);
    }

    static async create(
      request: Request,
      response: Response,
      next: NextFunction,
    ) {
      const { body } = request;
      try {
        const data = await service.create(body);
        return response.status(201).json();
      } catch (error) {
        next(error);
      }
    }

    static async findById(
      request: Request,
      response: Response,
      next: NextFunction,
    ) {
      let data;
      try {
        data = await service.findById(Number.parseInt(request.params.id));

        if (!data) {
          throw new Error('Recurso não encontrado');
        }
      } catch (error) {
        next(error);
      }
      return response.status(200).json(data);
    }

    static async deleteById(
      request: Request,
      response: Response,
      next: NextFunction,
    ) {
      let data;
      try {
        data = await service.deleteById(Number.parseInt(request.params.id));

        if (!data?.affected) {
          throw new Error('Recurso não encontrado');
        }
      } catch (error) {
        next(error);
      }

      return response.status(200).json();
    }

    static async updateById(
      request: Request,
      response: Response,
      next: NextFunction,
    ) {
      const { body } = request;
      const { id } = request.params;
      const identifier = Number.parseInt(id);

      try {
        const data = await service.updateById(identifier, body);
        if (!data?.affected) {
          throw new Error('Recurso não encontrado');
        }
        return response.status(200).json();
      } catch (error) {
        next(error);
      }
    }
  }

  return Controller;
}
