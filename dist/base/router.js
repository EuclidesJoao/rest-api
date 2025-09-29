"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const id_param_handler_1 = __importDefault(require("./middlewares/id-param-handler"));
const pagination_query_string_handler_1 = __importDefault(require("./middlewares/pagination-query-string-handler"));
const data_submission_handler_1 = require("./middlewares/data-submission-handler");
function getRouterBase(name, controller, createDTO, dataSubmissionOptionalMiddlewares = [], findOptionalMiddlewares = [], deleteOptionalMiddlewares = []) {
    const router = express_1.default.Router();
    router.post(`/${name}`, ...dataSubmissionOptionalMiddlewares, (0, data_submission_handler_1.verifyCreateRequestBody)(createDTO), controller.create);
    router.put(`/${name}/:id`, ...dataSubmissionOptionalMiddlewares, (0, data_submission_handler_1.verifyUpdateRequestBody)(createDTO), controller.updateById);
    router.get(`/${name}`, ...findOptionalMiddlewares, pagination_query_string_handler_1.default, controller.find);
    router.use(`/${name}/:id`, id_param_handler_1.default);
    router.get(`/${name}/:id`, controller.findById);
    router.delete(`/${name}/:id`, ...deleteOptionalMiddlewares, controller.deleteById);
    router.use(`/${name}`, error_handler_1.default);
    return router;
}
exports.default = getRouterBase;
//# sourceMappingURL=router.js.map