const express = require('express');
// express-session module thats allows you to get and set data to a sessions using cookies stored on a client
const session = require('express-session');
const passport = require('');
const db = require('./models');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', routes);

// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
