export const fans = async ({ id }, _, { datasources }) => {
  const fans = await datasources.fan.getFansByArtist({ artistId: id });

  return fans.fans;
};
