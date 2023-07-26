import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import { resolvers } from "./resolvers";
import { createPostgresClient } from "./config/db";
import { MusicDatasource } from "./datasources/MusicDatasource";
import sqlPlugin from "./plugins/sqlPlugin";

async function startApolloServer() {
  const knex = createPostgresClient();

  const server = new ApolloServer({
    typeDefs: await loadFiles("./src/typeDefs/**/*.graphql"),
    resolvers,
    plugins: [sqlPlugin()],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({
      datasources: {
        music: new MusicDatasource(knex),
      },
    }),
  });

  console.log(`🚀 Server listening at: ${url}`);
}

startApolloServer();