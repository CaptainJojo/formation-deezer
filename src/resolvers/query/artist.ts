export const artist = async (_, { id }, { datasources }) => {
  const artistById = await datasources.artist.getArtistById({ id });

  if (!artistById) {
    return {
      __typename: "ArtistNotFound",
      message: "Artist not found",
    };
  }

  return {
    __typename: "Artist",
    ...artistById,
  };
};
