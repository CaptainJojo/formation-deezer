"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrTimeToSeconds = void 0;
const sqlCollector_1 = __importDefault(require("./sqlCollector"));
const insertBindingsToSQL = (sql, bindings) => {
    return sql.split("?").reduce((memo, part, index) => {
        const binding = bindings[index] ? JSON.stringify(bindings[index]) : "";
        return memo + part + binding;
    }, "");
};
const hrTimeToSeconds = ([seconds, nanoSeconds]) => seconds + nanoSeconds / 1000000;
exports.hrTimeToSeconds = hrTimeToSeconds;
exports.default = (knex) => {
    const queries = [];
    knex
        .on("query", ({ sql, bindings, __knexQueryUid: queryId }) => {
        const startTime = process.hrtime();
        queries[queryId] = { sql, startTime, bindings };
    })
        .on("query-response", (_, { __knexQueryUid: queryId }) => {
        const { startTime, sql, bindings } = queries[queryId];
        const endTime = process.hrtime(startTime);
        const query = insertBindingsToSQL(sql, bindings);
        sqlCollector_1.default.addQuery({
            executionTime: (0, exports.hrTimeToSeconds)(endTime),
            query,
        });
    });
    return knex;
};
