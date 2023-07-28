"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlCollector_1 = __importDefault(require("./sqlCollector"));
function default_1() {
    return {
        async requestDidStart() {
            return {
                async willSendResponse(requestContext) {
                    const sqlExtension = {
                        executionTime: sqlCollector_1.default.executionTime,
                        numbersOfQueries: sqlCollector_1.default.queries.length,
                        queries: sqlCollector_1.default.queries,
                    };
                    // eslint-disable-next-line no-param-reassign
                    // eslint-disable-next-line no-param-reassign
                    //@ts-ignore: https://www.apollographql.com/docs/apollo-server/migration/#formatresponse-hook
                    requestContext.response.body.singleResult.extensions = {
                        //@ts-ignore: https://www.apollographql.com/docs/apollo-server/migration/#formatresponse-hook
                        ...requestContext.response.body.singleResult.extensions,
                        sqlExtension,
                    };
                    sqlCollector_1.default.reset();
                },
            };
        },
    };
}
exports.default = default_1;
