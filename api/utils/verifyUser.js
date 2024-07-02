import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  console.log("hii");
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Access denied!"));
  console.log("Token:", token);
  console.log("JWT Secret:", process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification error:", err);
      return next(errorHandler(403, "Invalid token"));
    }
    req.user = decoded; // Assuming you want to use the decoded user information
    console.log("JWT verification successful:", decoded);
    next();
  });
};
