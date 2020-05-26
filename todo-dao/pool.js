/* require all the dependencies for the module */
const mysql = require('mysql');

/* creating pool to be used by the dao layer modules */

const pool =  mysql.createPool({
    connectionLimit : process.env.connectionLimit,
    host            : process.env.host,
    user            : process.env.user,
    password        : process.env.password,
    database        : process.env.database
});

/* export the pool to be used by other modules */
module.exports = pool;