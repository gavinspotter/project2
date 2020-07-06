const path = require('path');
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = (app) => {

  app.get('/index', (req, res) => {
    if (req.user) {
      res.redirect('/search');
    }
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.get('/signup', (req, res) => {
    if (req.user) {
      res.redirect('/search');
    }
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });

  app.get('/search', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/search.html'));
  });

  app.get('/saved', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/saved.html'));
  });

  // Place this route below all others to send he index.html file
  // to any request that is not explicitly defined above
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
