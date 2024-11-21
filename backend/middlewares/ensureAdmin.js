const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function ensureAdmin(req, res, next) {
  // Check if user is authenticated and is an admin
  // Extract token from cookies
  // const token = req.cookies.token;
  const token = req.headers["token"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Token not provided" });
  }

  // Decode the token to get the userId (ObjectId)
  let userId;
  try {
    const decodedToken = jwt.verify(token, "Hari@2141");
    userId = decodedToken._id; // Assuming the token contains userId
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }
  const user = await User.findById({ _id: userId });
  console.log(user);
  if (user && user.role == "ADMIN") {
    return next(); // User is admin, proceed with the request
  }
  // If user is not an admin, return a forbidden response
  res.status(403).json({ message: "Access denied. Admins only." });
}

module.exports = ensureAdmin;
