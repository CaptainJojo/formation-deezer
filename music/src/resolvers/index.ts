import { musics } from "./query/musics";
import { author } from "./music/author";

export const resolvers = {
  Query: {
    musics,
  },
  Music: {
    author,
  },
};
