"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class InvalidIntrospectionKeyHeaderError extends graphql_1.GraphQLError {
    constructor() {
        super("To enable GraphQL introspection in production, fill the 'x-introspection-key' header with the right key.");
        Object.defineProperty(this, "name", {
            value: "InvalidIntrospectionKeyHeaderError",
        });
    }
}
exports.default = {
    requestDidStart() {
        return {
            didResolveOperation(requestContext) {
                const { request, operationName } = requestContext;
                if ((operationName === "IntrospectionQuery" ||
                    operationName === "GraphIntrospectQuery") &&
                    request.http?.headers.get("x-introspection-key") !== "mykey") {
                    throw new InvalidIntrospectionKeyHeaderError();
                }
            },
        };
    },
};
