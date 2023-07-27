import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import { resolvers } from "./resolvers";
import { createPostgresClient } from "./config/db";
import { ArtistDatasource } from "./datasources/ArtistDatasource";

async function startApolloServer() {
  const knex = createPostgresClient();

  const server = new ApolloServer({
    typeDefs: await loadFiles("./src/typeDefs/**/*.graphql"),
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({
      datasources: {
        artist: new ArtistDatasource(knex),
      },
    }),
  });

  console.log(`🚀 Server listening at: ${url}`);
}

startApolloServer();