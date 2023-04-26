const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection.js'); // Import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  // Set force to true if you want to drop and recreate all tables on server start
  // Alternatively, you can set it to false to only create tables if they don't exist

  // Turn on the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

