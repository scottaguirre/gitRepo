const db = require("../../config");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT userId, password FROM User WHERE username = '${username}'`;

  try {
    db.query(sql, (err, result) => {
      if (err) throw new Error("Something went wrong");
      if (result.length <= 0) {
        return res.status(402).json("Failed retrieving username");
      }

      bcrypt.compare(password, result[0].password, (err, match) => {
        if (err) throw new Error("Error comparing passwords");

        if (!match) {
          return res.status(402).json("Passwords don't match");
        } else {
          const { userId } = result[0];
          const token = jwt.sign({ username, userId }, process.env.SECRET);
          res.status(200).json(token);
        }
      });
    });
  } catch (err) {
    res.status(402).json(err);
  }
};
