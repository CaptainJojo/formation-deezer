"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musics = void 0;
const musics = async (parent, _, { datasources }) => {
    const musics = await datasources.playlistMusic.getMusicsByPlaylist({
        id: parent.id,
    });
    return Promise.all(musics.map(async (music) => {
        return datasources.music.getMusicById({
            id: music.music_id,
        });
    }));
};
exports.musics = musics;
