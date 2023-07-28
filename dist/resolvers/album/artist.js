"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artist = void 0;
const artist = async ({ artist_id }, _, { datasources }) => {
    const artistResult = await datasources.artist.getArtistById({
        id: artist_id,
    });
    return artistResult;
};
exports.artist = artist;
