const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// Use a local strategy to set login credentials. In this case, username/email and password.
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function(email, password, done) {
      // Use findOne method to locate user when theres a sign in attempt.
      db.User.findOne({
        where: {
          email: email
        },
      }).then(function(dbUser) {
        //   If we're unable to find the users email.
        if (!dbUser) {
          return done(null, false, {
            message:
              'You have entered an incorrect email or are not yet registered.',
          });
          // If the password doesn't match the entered email.
        } 
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: 'You have entered an incorrect password.',
          });
        }
        // If neither are found, return the user.
        return done(null, dbUser);
      });
    },
  ),
);

// Sequelize must serialize and deserialize users to maintain authentication across HTTP requests
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Export passport to the api-routes file
module.exports = passport;
