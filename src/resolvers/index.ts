import { artist } from "./query/artist";
import { fans } from "./artist/fans";
import { myFavoritesArtist } from "./home/myFavoritesArtist";
import { forYou } from "./home/forYou";
import { musics } from "./playlist/musics";
import { addFavoriteArtist } from "./mutation/addFavoriteArtist";
export const resolvers = {
  Query: {
    artist,
    home: () => ({}),
  },
  Mutation: {
    addFavoriteArtist,
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
