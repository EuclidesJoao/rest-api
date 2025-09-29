import { IService } from './interfaces/IService';
import { Request, Response, NextFunction } from 'express';
export declare function getController<Service extends IService, DTOClass extends object>(service: Service, dtoClass: new () => DTOClass): {
    new (): {};
    find(request: Request, response: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    create(request: Request, response: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    findById(request: Request, response: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    deleteById(request: Request, response: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    updateById(request: Request, response: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=controller.d.ts.map