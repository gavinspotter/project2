const path = require('path');
const router = require('express').Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/search');
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/signup', (req, res) => {
  if (req.user) {
    res.redirect('/search');
  }
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/search', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/search.html'));
});

router.get('/saved', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/saved.html'));
});

// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
