"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { NODE_ENV } = process.env;
const SERVER_NAME = 'RESTful API';
const PROD = ["PROD", "PRODUCTION"];
const DEV = ["DEV", "DEVELOPMENT"];
const TEST = ["TEST"];
function getStringFromEnvironment(environmentVariableName) {
    const DEFAULT_STRING_VALUE = "";
    const value = process.env?.[environmentVariableName] ?? DEFAULT_STRING_VALUE;
    return value;
}
function getNumberFromEnvironment(environmentVariableName) {
    const DEFAULT_STRING_VALUE = 0;
    const value = process.env?.[environmentVariableName]
        ? Number.parseInt(process.env?.[environmentVariableName])
        : DEFAULT_STRING_VALUE;
    return value;
}
function getConfigurationObject(selectedEnvironment) {
    const environment = selectedEnvironment[0];
    const configuration = {
        database: {
            port: getNumberFromEnvironment(`DB_PORT_${environment}`),
            host: getStringFromEnvironment(`DB_HOST_${environment}`),
            database: getStringFromEnvironment(`DB_NAME_${environment}`),
            username: getStringFromEnvironment(`DB_USERNAME_${environment}`),
            password: getStringFromEnvironment(`DB_PASSWORD_${environment}`),
        },
    };
    return configuration;
}
function getEnvironmentConfiguration() {
    const selectedEnvironment = NODE_ENV?.toLocaleUpperCase();
    function isSelectedEnvironment(environment) {
        return environment == selectedEnvironment;
    }
    if (selectedEnvironment) {
        if (PROD.some(isSelectedEnvironment)) {
            return getConfigurationObject(PROD);
        }
        if (TEST.some(isSelectedEnvironment)) {
            return getConfigurationObject(TEST);
        }
    }
    return getConfigurationObject(DEV);
}
const selectedEnvironmentConfiguration = getEnvironmentConfiguration();
const configuration = {
    server: {
        name: SERVER_NAME,
        version: getStringFromEnvironment('API_VERSION'),
        port: getNumberFromEnvironment('SERVER_PORT'),
        docsPath: getStringFromEnvironment('DOCUMENTATION_PATH')
    },
    ...selectedEnvironmentConfiguration
};
exports.default = configuration;
//# sourceMappingURL=index.js.map