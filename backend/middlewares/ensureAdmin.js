function ensureAdmin(req, res, next) {
  // Check if user is authenticated and is an admin
  console.log(req.user);
  if (req.user && req.user.role === "USER") {
    return next(); // User is admin, proceed with the request
  }
  // If user is not an admin, return a forbidden response
  res.status(403).json({ message: "Access denied. Admins only." });
}

module.exports = ensureAdmin;
