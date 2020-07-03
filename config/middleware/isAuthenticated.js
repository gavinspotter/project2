// Middleware for restricting routes an unauthenticated user is prohibited from accessing.
module.exports = (req, res, next) => {
  // If user is logged in, permit access to restricted route.
  if (req.user) {
    return next();
  }
  // Otherwise, redirect user to the homepage.
  return res.redirect('/');
};
