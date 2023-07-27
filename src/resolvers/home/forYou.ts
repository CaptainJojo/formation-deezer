export const forYou = async (_, __, { datasources, userId }) => {
  const forYou = await datasources.forYou.getForYou({ userId });

  return Promise.all(
    forYou.map(async (forYou) => {
      return await datasources.playlist.getPlaylistById({
        id: forYou.playlist_id,
      });
    })
  );
};
