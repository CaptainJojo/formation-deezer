"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFavoritesArtist = void 0;
const myFavoritesArtist = async (_, __, { datasources, userId }) => {
    const myFavoritesArtist = await datasources.favoritesArtist.getFavoritesArtist({ userId });
    return Promise.all(myFavoritesArtist.map(async (favoriteArtist) => {
        return datasources.artist.getArtistById({
            id: favoriteArtist.artist_id,
        });
    }));
};
exports.myFavoritesArtist = myFavoritesArtist;
