export const playlists = async (_, __, { datasources }) => {
  const playlists = await datasources.playlist.getPlaylists();

  return playlists;
};
