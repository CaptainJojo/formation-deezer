import {
  ApolloServerPlugin,
  GraphQLRequestContextWillSendResponse,
} from "@apollo/server";
import SQLCollector from "./sqlCollector";

export default function (): ApolloServerPlugin {
  return {
    async requestDidStart() {
      return {
        async willSendResponse(
          requestContext: GraphQLRequestContextWillSendResponse<any>
        ): Promise<void> {
          const sqlExtension = {
            executionTime: SQLCollector.executionTime,
            numbersOfQueries: SQLCollector.queries.length,
            queries: SQLCollector.queries,
          };

          // eslint-disable-next-line no-param-reassign
          // eslint-disable-next-line no-param-reassign
          //@ts-ignore: https://www.apollographql.com/docs/apollo-server/migration/#formatresponse-hook
          requestContext.response.body.singleResult.extensions = {
            //@ts-ignore: https://www.apollographql.com/docs/apollo-server/migration/#formatresponse-hook
            ...requestContext.response.body.singleResult.extensions,
            sqlExtension,
          };

          SQLCollector.reset();
        },
      };
    },
  };
}
