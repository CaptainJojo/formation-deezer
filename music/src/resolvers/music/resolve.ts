export const resolve = async (music, { datasources }) => {
  return datasources.music.getMusicById(music.id);
};
