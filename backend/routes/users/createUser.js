const db = require("../../config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  // Validating inputs
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    const error = [...errors.array()];
    console.log(error);
    const errorToSend = error.map(err => {
      return `${err.param} ${err.msg}`;
    });
    return res.status(402).json(errorToSend);
  }

  let { name, lastName, username, password, email } = req.body;

  // Checking if user already exists

  db.query(
    `SELECT username FROM User WHERE username = '${username}'`,
    async (err, result) => {
      console.log(result);
      if (err) return res.status(400).json("Something went wrong");
      if (result.length > 0)
        return res.status(400).json("Username already taken");

      // Hashing password
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let post = {
          name,
          lastName,
          username,
          password: hashedPassword,
          email
        };

        // Inserting into database
        const sql = `INSERT INTO User SET ?`;

        db.query(sql, post, (err, result) => {
          if (err) return res.status(404).json("Something went wrong");
          console.log(result);
          res.status(200).json(result);
        });
      } catch (err) {
        if (err) res.status(422).json(err);
      }
    }
  );
};
