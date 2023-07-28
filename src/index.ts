import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import { resolvers } from "./resolvers";
import { createPostgresClient } from "./config/db";
import { ArtistDatasource } from "./datasources/ArtistDatasource";
import { FanDatasource } from "./datasources/FanDatasource";
import { ForYouDatasource } from "./datasources/ForYouDatasource";
import { FavoritesArtistDatasource } from "./datasources/FavoritesArtistDatasource";
import { PlaylistDatasource } from "./datasources/PlaylistDatasource";
import { PlaylistMusicDatasource } from "./datasources/PlaylistMusicDatasource";
import { MusicDatasource } from "./datasources/MusicDatasource";
import sqlPlugin from "./plugins/sqlPlugin";
import { AlbumDatasource } from "./datasources/AlbumDatasource";
import Keyv from "keyv";
import { KeyvAdapter } from "@apollo/utils.keyvadapter";

async function startApolloServer() {
  const knex = createPostgresClient();

  const cache = new KeyvAdapter(new Keyv("redis://localhost:6382"));
  const server = new ApolloServer({
    typeDefs: await loadFiles("./src/typeDefs/**/*.graphql"),
    resolvers,
    plugins: [sqlPlugin()],
    cache,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      return {
        cache,
        userId: req.headers["user-id"],
        datasources: {
          artist: new ArtistDatasource(knex, cache),
          fan: new FanDatasource(knex),
          forYou: new ForYouDatasource(knex),
          favoritesArtist: new FavoritesArtistDatasource(knex),
          playlist: new PlaylistDatasource(knex),
          playlistMusic: new PlaylistMusicDatasource(knex),
          music: new MusicDatasource(knex, cache),
          album: new AlbumDatasource(knex, cache),
        },
      };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
}

startApolloServer();