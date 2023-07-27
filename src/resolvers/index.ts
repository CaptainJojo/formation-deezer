import { artist } from "./query/artist";
import { fans } from "./artist/fans";
import { myFavoritesArtist } from "./home/myFavoritesArtist";
import { forYou } from "./home/forYou";
import { musics } from "./playlist/musics";

export const resolvers = {
  Query: {
    artist,
    home: () => ({}),
  },
  Artist: {
    fans,
  },
  Home: {
    myFavoriteArtist: myFavoritesArtist,
    forYou,
  },
  Playlist: {
    musics,
  },
};
