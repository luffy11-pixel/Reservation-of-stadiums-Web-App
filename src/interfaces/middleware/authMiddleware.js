// Check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).render('error', { 
    message: 'Access denied. Admin privileges required.' 
  });
}; 