"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const artist_1 = require("./query/artist");
const fans_1 = require("./artist/fans");
const myFavoritesArtist_1 = require("./home/myFavoritesArtist");
const forYou_1 = require("./home/forYou");
const musics_1 = require("./playlist/musics");
const addFavoriteArtist_1 = require("./mutation/addFavoriteArtist");
const musics_2 = require("./query/musics");
const albums_1 = require("./query/albums");
const artist_2 = require("./album/artist");
const musics_3 = require("./album/musics");
exports.resolvers = {
    Query: {
        artist: artist_1.artist,
        home: () => ({}),
        musics: musics_2.musics,
        albums: albums_1.albums,
    },
    Mutation: {
        addFavoriteArtist: addFavoriteArtist_1.addFavoriteArtist,
    },
    Artist: {
        fans: fans_1.fans,
    },
    Home: {
        myFavoriteArtist: myFavoritesArtist_1.myFavoritesArtist,
        forYou: forYou_1.forYou,
    },
    Playlist: {
        musics: musics_1.musics,
    },
    Album: {
        artist: artist_2.artist,
        musics: musics_3.musics,
    },
};
