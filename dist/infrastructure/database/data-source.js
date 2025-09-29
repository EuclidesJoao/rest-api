"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const index_js_1 = __importDefault(require("../../config/index.js"));
// import configuration from "../../config";
dotenv_1.default.config();
const { database: { host, port, username, password, database }, } = index_js_1.default;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host,
    port,
    username,
    password,
    database,
    logging: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}']
});
//# sourceMappingURL=data-source.js.map