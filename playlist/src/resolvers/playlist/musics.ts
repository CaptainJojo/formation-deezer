export const musics = async (playlist, _, { datasources }) => {
  const musicsResult = await datasources.playlist.getMusics(playlist.id);

  return musicsResult.map((music) => ({
    id: music.music_id,
  }));
};
