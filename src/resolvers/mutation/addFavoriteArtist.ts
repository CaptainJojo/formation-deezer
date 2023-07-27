export const addFavoriteArtist = async (
  _,
  { artistId },
  { datasources, userId }
) => {
  try {
    await datasources.favoritesArtist.addFavoriteArtist({ artistId, userId });
    return {
      __typename: "AddFavoriteArtistSuccess",
      message: "Artist added to favorites",
    };
  } catch (err) {
    return {
      __typename: "AddFavoriteArtistError",
      message: err.message,
    };
  }
};
