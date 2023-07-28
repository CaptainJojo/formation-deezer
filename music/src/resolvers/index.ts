import { musics } from "./query/musics";
import { author } from "./music/author";
import { resolve } from "./music/resolve";

export const resolvers = {
  Query: {
    musics,
  },
  Music: {
    author,
    __resolveReference: resolve,
  },
};
