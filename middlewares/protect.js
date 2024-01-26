const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  console.log("Received token:", token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
      req.user = await User.findById(decoded.userId).select(
        "-password -createdAt -updatedAt"
      );
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Not Authorized,Invalid Token" });
    }
  } else {
    console.log("No token present");
    res.status(401).json({ message: "Not Authorized,no token" });
  }
};

module.exports = { protect };
