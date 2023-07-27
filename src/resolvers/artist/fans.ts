export const fans = async (parent, _, { datasources }) => {
  const fans = await datasources.fan.getFansByArtist({ artistId: parent.id });

  return fans.fans;
};
