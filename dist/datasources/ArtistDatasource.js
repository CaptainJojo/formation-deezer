"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistDatasource = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
class ArtistDatasource {
    constructor(dbConnection, cache) {
        this.batchArtists = new dataloader_1.default(async (ids) => {
            const artists = await this.dbConnection("artist").whereIn("id", ids);
            return ids.map((id) => artists.find((artist) => artist.id === id));
        });
        this.dbConnection = dbConnection;
        this.cache = cache;
    }
    async getArtistById({ id }) {
        if (this.cache) {
            const artist = await this.cache.get(`artist-${id}`);
            if (artist) {
                return artist;
            }
        }
        const artist = await this.batchArtists.load(id);
        if (this.cache) {
            this.cache.set(`artist-${id}`, artist, { ttl: 60 });
        }
        return artist;
    }
}
exports.ArtistDatasource = ArtistDatasource;
