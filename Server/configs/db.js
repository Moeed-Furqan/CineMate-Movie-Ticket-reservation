const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "cinemate",
  password: "root123",
  port: 5432, // PostgreSQL default port
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
