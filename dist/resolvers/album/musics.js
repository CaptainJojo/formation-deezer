"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musics = void 0;
const musics = async ({ id }, __, { datasources }) => {
    const musics = await datasources.music.getMusicsByAlbum({ albumId: id });
    return musics;
};
exports.musics = musics;
