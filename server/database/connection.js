const mysql2 = require("mysql2");
require('dotenv').config();

const useLocalhost = process.env.USE_LOCALHOST === 'true';

let connectionParams = {
    user: process.env.DB_SERVER_USER,
    host: process.env.DB_SERVER_HOST,
    password: process.env.DB_SERVER_PASSWORD,
    database: process.env.DB_SERVER_DATABASE,
};

// 🔍 Debug output
console.log("Attempting DB connection with:");
console.log(connectionParams);

// Create connection pool
const pool = mysql2.createPool(connectionParams);

// Check connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error connecting to database:", err.message);
        process.exit(1);
    } else {
        console.log("✅ Database connection established");
        connection.release();
    }
});

module.exports = pool;
