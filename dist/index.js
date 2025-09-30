"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./infrastructure/database/data-source");
dotenv_1.default.config();
data_source_1.AppDataSource.initialize().then(async () => {
    const port = process.env.PORT || 3000;
    app_1.default.listen(port, () => {
        const docsUrl = `http://localhost:${port}/api-docs`;
        console.log(`🚀 Server is running on port: ${port}`);
        console.log(`📖 API Docs available at: ${docsUrl}`);
        // open(docsUrl);
    });
});
//# sourceMappingURL=index.js.map