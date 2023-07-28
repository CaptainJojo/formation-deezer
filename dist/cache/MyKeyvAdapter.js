"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyKeyvAdapter = void 0;
const utils_keyvadapter_1 = require("@apollo/utils.keyvadapter");
const redisCollector_1 = __importDefault(require("../plugins/redisCollector"));
class MyKeyvAdapter extends utils_keyvadapter_1.KeyvAdapter {
    constructor(keyv) {
        super(keyv);
    }
    async get(key) {
        redisCollector_1.default.addGetInfos({
            cacheId: key,
        });
        return super.get(key);
    }
    async set(key, value, options) {
        // @ts-ignore
        const { ttl } = { ...this.defaultSetOptions, ...options };
        redisCollector_1.default.addSetInfos({
            cacheId: key,
            ttl,
        });
        return super.set(key, value, options);
    }
}
exports.MyKeyvAdapter = MyKeyvAdapter;
