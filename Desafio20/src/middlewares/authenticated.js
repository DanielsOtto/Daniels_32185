export default function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();   // el return es necesario, si no, no anda
  }
  res.redirect('home');
}