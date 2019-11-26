const db = require("../../config");
const { validationResult } = require("express-validator");

exports.createPost = async (req, res) => {
  // If errors encountered during validation
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    const allErrors = [...errors.array()];

    const errorsToSend = allErrors.map(error => {
      return `${error.param} ${error.msg}`;
    });

    return res.status(404).json(errorsToSend);
  }

  const { title, blog_Body, image } = req.body;
  const { userId, username } = req.token;
  const sql = `INSERT INTO Post SET ?`;
  const post = { title, blogBody: blog_Body, image, userId, username };

  db.query(sql, post, (err, result) => {
    if (err) return res.status(404).json("An error ocurred");
    res.status(202).json(result);
  });
};
