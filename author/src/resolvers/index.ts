import { authors } from "./query/authors";
import { resolve } from "./author/resolve";

export const resolvers = {
  Query: {
    authors,
  },
  Author: {
    __resolveReference: resolve,
  },
};
