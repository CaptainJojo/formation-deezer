export const musics = async (_, __, { datasources }) => {
  const musics = await datasources.music.getMusics();

  return musics;
};
