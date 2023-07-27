export const encode = (stringToEncode = "") =>
  Buffer.from(stringToEncode).toString("base64");

export const decode = (stringToDecode = "") =>
  Buffer.from(stringToDecode, "base64").toString();

export const musics = async (_, { first, after }, { datasources }) => {
  const musics = await datasources.music.getMusics(
    first,
    after ? decode(after) : null
  );

  return {
    edges: musics.slice(0, first).map((music) => ({
      cursor: encode(music.title.toString()),
      node: music,
    })),
    pageInfo: {
      hasNextPage: musics.length > first,
      endCursor: encode(
        musics[musics.slice(0, first).length - 1]?.title.toString()
      ),
    },
  };
};
