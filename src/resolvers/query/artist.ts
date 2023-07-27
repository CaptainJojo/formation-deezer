export const artist = async (_, { id }) => {
  return {
    __typename: "Artist",
    id: 1,
    name: "The Beatles",
    fans: 123,
    albums: [
      {
        id: 1,
        name: "Abbey Road",
      },
    ],
    topMusics: [
      {
        id: 1,
        name: "Here Comes the Sun",
      },
    ],
  };
};
