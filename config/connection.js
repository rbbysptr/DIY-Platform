const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "DIYPlatform",
    password: "postgres",
    port: 5432,
    idleTimeoutMillis: 2000,
});

module.exports = pool;
