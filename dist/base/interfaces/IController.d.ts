import { Request, Response, NextFunction } from "express";
export interface IController {
    find(request: Request, response: Response, next?: NextFunction): any;
    create(request: Request, response: Response, next?: NextFunction): any;
    findById(request: Request, response: Response, next?: NextFunction): any;
    deleteById(request: Request, response: Response, next?: NextFunction): any;
    updateById(request: Request, response: Response, next?: NextFunction): any;
}
//# sourceMappingURL=IController.d.ts.map