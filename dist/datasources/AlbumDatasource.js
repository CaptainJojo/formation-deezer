"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumDatasource = void 0;
class AlbumDatasource {
    constructor(dbConnection, cache) {
        this.dbConnection = dbConnection;
        this.cache = cache;
    }
    async getAlbums(first, after) {
        if (this.cache) {
            const cachedAlbums = await this.cache.get(`albums-${first}-${after}-v2`);
            if (cachedAlbums) {
                return cachedAlbums;
            }
        }
        const condition = after ? `and title < '${after}'` : "";
        const limit = first + 1;
        const musics = await this.dbConnection.raw(`SELECT * FROM album WHERE 0=0
      ${condition}
      ORDER BY title DESC LIMIT ?`, [limit]);
        if (this.cache) {
            this.cache.set(`albums-${first}-${after}-v2`, musics.rows, { ttl: 60 });
        }
        return musics.rows;
    }
}
exports.AlbumDatasource = AlbumDatasource;
