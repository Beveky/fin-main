const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "300d",
  });

  res.cookie("jwt", token, { httpOnly: true, sameSite: "strict" });

  return token;
};

module.exports = generateToken;
