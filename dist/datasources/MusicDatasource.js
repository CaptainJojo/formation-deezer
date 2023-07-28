"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicDatasource = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
class MusicDatasource {
    constructor(dbConnection, cache) {
        this.batchMusics = new dataloader_1.default(async (ids) => {
            const musics = await this.dbConnection("music").whereIn("id", ids);
            return ids.map((id) => musics.find((music) => music.id === id));
        });
        this.batchMusicsByAlbum = new dataloader_1.default(async (albumIds) => {
            const musics = await this.dbConnection("music").whereIn("album_id", albumIds);
            return albumIds.map((albumId) => musics.filter((music) => music.album_id === albumId));
        });
        this.dbConnection = dbConnection;
        this.cache = cache;
    }
    async getMusicById({ id }) {
        return this.batchMusics.load(id);
    }
    async getMusics(first, after) {
        const condition = after ? `and title < '${after}'` : "";
        const limit = first + 1;
        const musics = await this.dbConnection.raw(`SELECT * FROM music WHERE 0=0
      ${condition}
      ORDER BY title DESC LIMIT ?`, [limit]);
        return musics.rows;
    }
    async getMusicsByAlbum({ albumId }) {
        if (this.cache) {
            const cachedMusics = await this.cache.get(`musics-${albumId}`);
            if (cachedMusics) {
                return cachedMusics;
            }
        }
        const musicAlbums = await this.batchMusicsByAlbum.load(albumId);
        if (this.cache) {
            this.cache.set(`musics-${albumId}`, musicAlbums, { ttl: 60 });
        }
        return musicAlbums;
    }
}
exports.MusicDatasource = MusicDatasource;
