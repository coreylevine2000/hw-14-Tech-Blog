const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    console.log('Authorizing', req.session.logged_in)
    if (req.session.logged_in != true) {
      console.log('Redirecting to Login')
      
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;