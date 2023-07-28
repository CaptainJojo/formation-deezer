"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forYou = void 0;
const forYou = async (_, __, { datasources, userId }) => {
    const forYou = await datasources.forYou.getForYou({ userId });
    return Promise.all(forYou.map(async (forYou) => {
        return datasources.playlist.getPlaylistById({
            id: forYou.playlist_id,
        });
    }));
};
exports.forYou = forYou;
