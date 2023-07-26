import Knex from "knex";
import knexLogger from "../plugins/knexLogger";

export const createPostgresClient = () => {
  return knexLogger(
    Knex({
      client: "pg",
      connection: {
        host: "localhost",
        port: 5435,
        user: "postgres",
        password: "postgres",
        database: "deezer",
      },
    })
  );
};
