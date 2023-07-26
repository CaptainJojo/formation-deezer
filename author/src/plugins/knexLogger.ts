import SQLCollector from "./sqlCollector";

const insertBindingsToSQL = (sql, bindings) => {
  return sql.split("?").reduce((memo, part, index) => {
    const binding = bindings[index] ? JSON.stringify(bindings[index]) : "";
    return memo + part + binding;
  }, "");
};

export const hrTimeToSeconds = ([seconds, nanoSeconds]) =>
  seconds + nanoSeconds / 1_000_000;

export default (knex) => {
  const queries = [];

  knex
    .on("query", ({ sql, bindings, __knexQueryUid: queryId }) => {
      const startTime = process.hrtime();

      queries[queryId] = { sql, startTime, bindings };
    })
    .on("query-response", (_, { __knexQueryUid: queryId }) => {
      const { startTime, sql, bindings } = queries[queryId];

      const endTime = process.hrtime(startTime);
      const query = insertBindingsToSQL(sql, bindings);

      SQLCollector.addQuery({
        executionTime: hrTimeToSeconds(endTime),
        query,
      });
    });

  return knex;
};
