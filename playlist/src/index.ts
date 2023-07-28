import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import { resolvers } from "./resolvers";
import { createPostgresClient } from "./config/db";
import { PlaylistDatasource } from "./datasources/PlaylistDatasource";
import sqlPlugin from "./plugins/sqlPlugin";
import { buildSubgraphSchema } from "@apollo/subgraph";

async function startApolloServer() {
  const knex = createPostgresClient();

  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs: await loadFiles("./src/typeDefs/**/*.graphql"),
      resolvers,
    }),
    plugins: [sqlPlugin()],
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4004 },
    context: async ({ req }) => ({
      datasources: {
        playlist: new PlaylistDatasource(knex),
      },
    }),
  });

  console.log(`🚀 Server listening at: ${url}`);
}

startApolloServer();
