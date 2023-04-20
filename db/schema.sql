const mysql = require('mysql');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Read the schema file
const schema = fs.readFileSync('./db/schema.sql').toString();

// Run the schema file to create tables
pool.query(schema, (error, results) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('Database schema created successfully');
  process.exit(0);
});
