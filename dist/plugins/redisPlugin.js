"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisCollector_1 = __importDefault(require("./redisCollector"));
exports.default = {
    requestDidStart() {
        return {
            willSendResponse(requestContext) {
                const redisExtension = {
                    numbersOfGet: redisCollector_1.default.getInfos.length,
                    numbersOfSet: redisCollector_1.default.setInfos.length,
                    getInfos: redisCollector_1.default.getInfos,
                    setInfos: redisCollector_1.default.setInfos,
                };
                // eslint-disable-next-line no-param-reassign
                requestContext.response.body.singleResult.extensions = {
                    ...requestContext.response.body.singleResult.extensions,
                    redisExtension,
                };
                redisCollector_1.default.reset();
            },
        };
    },
};
