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

async function startApolloServer() {
  const knex = createPostgresClient();

  const server = new ApolloServer({
    typeDefs: await loadFiles("./src/typeDefs/**/*.graphql"),
    resolvers,
    plugins: [sqlPlugin()],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      return {
        userId: req.headers["user-id"],
        datasources: {
          artist: new ArtistDatasource(knex),
          fan: new FanDatasource(knex),
          forYou: new ForYouDatasource(knex),
          favoritesArtist: new FavoritesArtistDatasource(knex),
          playlist: new PlaylistDatasource(knex),
          playlistMusic: new PlaylistMusicDatasource(knex),
          music: new MusicDatasource(knex),
          album: new AlbumDatasource(knex),
        },
      };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
}

startApolloServer();