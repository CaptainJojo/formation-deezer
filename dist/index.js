"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const load_files_1 = require("@graphql-tools/load-files");
const resolvers_1 = require("./resolvers");
const db_1 = require("./config/db");
const ArtistDatasource_1 = require("./datasources/ArtistDatasource");
const FanDatasource_1 = require("./datasources/FanDatasource");
const ForYouDatasource_1 = require("./datasources/ForYouDatasource");
const FavoritesArtistDatasource_1 = require("./datasources/FavoritesArtistDatasource");
const PlaylistDatasource_1 = require("./datasources/PlaylistDatasource");
const PlaylistMusicDatasource_1 = require("./datasources/PlaylistMusicDatasource");
const MusicDatasource_1 = require("./datasources/MusicDatasource");
const sqlPlugin_1 = __importDefault(require("./plugins/sqlPlugin"));
const AlbumDatasource_1 = require("./datasources/AlbumDatasource");
const keyv_1 = __importDefault(require("keyv"));
const redisPlugin_1 = __importDefault(require("./plugins/redisPlugin"));
const MyKeyvAdapter_1 = require("./cache/MyKeyvAdapter");
const instrospection_1 = __importDefault(require("./plugins/instrospection"));
async function startApolloServer() {
    const knex = (0, db_1.createPostgresClient)();
    const cache = new MyKeyvAdapter_1.MyKeyvAdapter(new keyv_1.default("redis://localhost:6382"));
    const server = new server_1.ApolloServer({
        typeDefs: await (0, load_files_1.loadFiles)("./src/typeDefs/**/*.graphql"),
        resolvers: resolvers_1.resolvers,
        // @ts-ignore
        plugins: [(0, sqlPlugin_1.default)(), redisPlugin_1.default, instrospection_1.default],
        cache,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            return {
                cache,
                userId: req.headers["user-id"],
                datasources: {
                    artist: new ArtistDatasource_1.ArtistDatasource(knex, cache),
                    fan: new FanDatasource_1.FanDatasource(knex),
                    forYou: new ForYouDatasource_1.ForYouDatasource(knex),
                    favoritesArtist: new FavoritesArtistDatasource_1.FavoritesArtistDatasource(knex),
                    playlist: new PlaylistDatasource_1.PlaylistDatasource(knex),
                    playlistMusic: new PlaylistMusicDatasource_1.PlaylistMusicDatasource(knex),
                    music: new MusicDatasource_1.MusicDatasource(knex, cache),
                    album: new AlbumDatasource_1.AlbumDatasource(knex, cache),
                },
            };
        },
    });
    console.log(`🚀 Server listening at: ${url}`);
}
startApolloServer();
