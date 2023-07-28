export const artist = async ({ artist_id }, _, { datasources }) => {
  const artistResult = await datasources.artist.getArtistById({
    id: artist_id,
  });

  return artistResult;
};
