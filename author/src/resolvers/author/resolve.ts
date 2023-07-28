export const resolve = async (author, { datasources }) => {
  return datasources.author.getAuthorById(author.id);
};
