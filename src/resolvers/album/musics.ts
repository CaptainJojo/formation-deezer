export const musics = async ({ id }, __, { datasources }) => {
  const musics = await datasources.music.getMusicsByAlbum({ albumId: id });

  return musics;
};
