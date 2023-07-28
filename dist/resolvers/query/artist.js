"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artist = void 0;
const artist = async (_, { id }, { datasources }) => {
    const artistById = await datasources.artist.getArtistById({ id });
    if (!artistById) {
        return {
            __typename: "ArtistNotFound",
            message: "Artist not found",
        };
    }
    return {
        __typename: "Artist",
        ...artistById,
    };
};
exports.artist = artist;
