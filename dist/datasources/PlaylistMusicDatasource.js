"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistMusicDatasource = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
class PlaylistMusicDatasource {
    constructor(dbConnection) {
        this.batchMusicsPlaylist = new dataloader_1.default(async (ids) => {
            const musicsPlaylist = await this.dbConnection("playlist_music").whereIn("playlist_id", ids);
            return ids.map((id) => musicsPlaylist.filter((musicPlaylist) => musicPlaylist.playlist_id === id));
        });
        this.dbConnection = dbConnection;
    }
    async getMusicsByPlaylist({ id }) {
        return this.batchMusicsPlaylist.load(id);
    }
}
exports.PlaylistMusicDatasource = PlaylistMusicDatasource;
