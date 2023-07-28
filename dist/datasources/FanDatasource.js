"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FanDatasource = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
class FanDatasource {
    constructor(dbConnection) {
        this.batchFans = new dataloader_1.default(async (ids) => {
            const fans = await this.dbConnection("fan").whereIn("id", ids);
            return ids.map((id) => fans.find((fan) => fan.id === id));
        });
        this.dbConnection = dbConnection;
    }
    async getFansByArtist({ artistId }) {
        return this.batchFans.load(artistId);
    }
}
exports.FanDatasource = FanDatasource;
