export const myFavoritesArtist = async (_, __, { datasources, userId }) => {
  const myFavoritesArtist =
    await datasources.favoritesArtist.getFavoritesArtist({ userId });

  return Promise.all(
    myFavoritesArtist.map(async (favoriteArtist) => {
      return await datasources.artist.getArtistById({
        id: favoriteArtist.artist_id,
      });
    })
  );
};
