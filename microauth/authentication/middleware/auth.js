module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('http://localhost:5000/auth/googlelogin')
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('http://localhost:3000/dashboard?googleId='+ req.user.googleId);
    }
  },
}
