import express from 'express';
import { IController } from './interface/IController';
import errorHandler from './middlewares/error-handler';
import idParamHandler from './middlewares/id-param-handler';
import paginationQueryStringHandler from './middlewares/pagination-query-string-handler';
import {
  verifyUpdateRequestBody,
  verifyCreateRequestBody,
} from './middlewares/data-submission-handler';

function getRouterBase<T extends object>(
  name: string,
  controller: IController,
  createDTO: new () => T,
  dataSubmissionOptionalMiddlewares: any[] = [],
  findOptionalMiddlewares: any[] = [],
  deleteOptionalMiddlewares: any[] = [],
) {
  const router = express.Router();

  router.post(
    `/${name}`,
    ...dataSubmissionOptionalMiddlewares,
    verifyCreateRequestBody(createDTO),
    controller.create,
  );
  router.put(
    `/${name}/:id`,
    ...dataSubmissionOptionalMiddlewares,
    verifyUpdateRequestBody(createDTO),
    controller.updateById,
  );
  router.get(
    `/${name}`,
    ...findOptionalMiddlewares,
    paginationQueryStringHandler,
    controller.find,
  );
  router.use(`/${name}/:id`, idParamHandler);
  router.get(`/${name}/:id`, controller.findById);
  router.delete(
    `/${name}/:id`,
    ...deleteOptionalMiddlewares,
    controller.deleteById,
  );

  router.use(`/${name}`, errorHandler);

  return router;
}

export default getRouterBase;
