"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistDatasource = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
class PlaylistDatasource {
    constructor(dbConnection) {
        this.batchPlaylists = new dataloader_1.default(async (ids) => {
            const playlists = await this.dbConnection("playlist").whereIn("id", ids);
            return ids.map((id) => playlists.find((playlist) => playlist.id === id));
        });
        this.dbConnection = dbConnection;
    }
    async getPlaylistById({ id }) {
        return this.batchPlaylists.load(id);
    }
}
exports.PlaylistDatasource = PlaylistDatasource;
