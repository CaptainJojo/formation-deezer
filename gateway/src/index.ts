import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

async function startApolloServer() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "musics", url: "http://localhost:4000/graphql" },
        { name: "authors", url: "http://localhost:4001/graphql" },
        { name: "playlist", url: "http://localhost:4004/graphql" },
      ],
    }),
  });
  const server = new ApolloServer({
    gateway,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4003 },
  });

  console.log(`🚀 Server listening at: ${url}`);
}

startApolloServer();
