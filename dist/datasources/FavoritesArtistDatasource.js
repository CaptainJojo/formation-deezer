"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesArtistDatasource = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
class FavoritesArtistDatasource {
    constructor(dbConnection) {
        this.batchFavoritesArtist = new dataloader_1.default(async (ids) => {
            const favoritesArtist = await this.dbConnection("favorites_artist").whereIn("user_id", ids);
            return ids.map((id) => favoritesArtist.filter((favoriteArtist) => favoriteArtist.user_id === id));
        });
        this.dbConnection = dbConnection;
    }
    async getFavoritesArtist({ userId }) {
        return this.batchFavoritesArtist.load(userId);
    }
    async addFavoriteArtist({ artistId, userId }) {
        return await this.dbConnection("favorites_artist").insert({
            id: Math.floor(Math.random() * 1000000),
            artist_id: artistId,
            user_id: userId,
        });
    }
}
exports.FavoritesArtistDatasource = FavoritesArtistDatasource;
