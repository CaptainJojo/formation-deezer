export const authors = async (_, __, { datasources }) => {
  const authors = await datasources.author.getAuthors();

  return authors;
};
