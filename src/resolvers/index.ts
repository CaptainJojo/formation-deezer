import { home } from "./query/home";
import { artist } from "./query/artist";
import { fans } from "./artist/fans";
export const resolvers = {
  Query: {
    home,
    artist,
  },
  Artist: {
    fans,
  },
};
