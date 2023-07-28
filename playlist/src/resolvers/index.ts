import { playlists } from "./query/playlists";
import { musics } from "./playlist/musics";

export const resolvers = {
  Query: {
    playlists,
  },
  Playlist: {
    musics,
  },
};
