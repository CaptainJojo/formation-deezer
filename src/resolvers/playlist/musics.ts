export const musics = async (parent, _, { datasources }) => {
  const musics = await datasources.playlistMusic.getMusicsByPlaylist({
    id: parent.id,
  });

  return Promise.all(
    musics.map(async (music) => {
      return datasources.music.getMusicById({
        id: music.music_id,
      });
    })
  );
};
