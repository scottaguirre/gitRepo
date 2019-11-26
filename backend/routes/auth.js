require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (typeof req.headers["authorization"] !== "undefined") {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) return res.sendStatus(403);
      req.token = payload;
      next();
    });
  } else {
    return res.sendStatus(403);
  }
};

module.exports = verifyToken;
