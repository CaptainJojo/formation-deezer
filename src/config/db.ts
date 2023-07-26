import Knex from "knex";

export const createPostgresClient = () => {
  return Knex({
    client: "pg",
    connection: {
      host: "localhost",
      port: 5435,
      user: "postgres",
      password: "postgres",
      database: "deezer",
    },
  });
};
