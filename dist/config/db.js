"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostgresClient = void 0;
const knex_1 = __importDefault(require("knex"));
const knexLogger_1 = __importDefault(require("../plugins/knexLogger"));
const createPostgresClient = () => {
    return (0, knexLogger_1.default)((0, knex_1.default)({
        client: "pg",
        connection: {
            host: "localhost",
            port: 5435,
            user: "postgres",
            password: "postgres",
            database: "deezer",
        },
    }));
};
exports.createPostgresClient = createPostgresClient;
