export const encode = (stringToEncode = "") =>
  Buffer.from(stringToEncode).toString("base64");

export const decode = (stringToDecode = "") =>
  Buffer.from(stringToDecode, "base64").toString();

export const albums = async (_, { first, after }, { datasources }) => {
  const albums = await datasources.album.getAlbums(
    first,
    after ? decode(after) : null
  );

  return {
    edges: albums.slice(0, first).map((album) => ({
      cursor: encode(album.title.toString()),
      node: album,
    })),
    pageInfo: {
      hasNextPage: albums.length > first,
      endCursor: encode(
        albums[albums.slice(0, first).length - 1]?.title.toString()
      ),
    },
  };
};
