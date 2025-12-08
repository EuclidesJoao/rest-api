"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
dotenv_1.default.config();
const pool = new pg_1.default.Pool({
    user: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    port: Number(process.env.DB_PORT_DEV),
    host: process.env.DB_HOST_DEV
});
exports.default = pool;
//# sourceMappingURL=data-source.js.map