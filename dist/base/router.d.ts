import { IController } from './interfaces/IController';
declare function getRouterBase<T extends object>(name: string, controller: IController, createDTO: new () => T, dataSubmissionOptionalMiddlewares?: any[], findOptionalMiddlewares?: any[], deleteOptionalMiddlewares?: any[]): import("express-serve-static-core").Router;
export default getRouterBase;
//# sourceMappingURL=router.d.ts.map