import { home } from "./query/home";
import { artist } from "./query/artist";

export const resolvers = {
  Query: {
    home,
    artist,
  },
};
