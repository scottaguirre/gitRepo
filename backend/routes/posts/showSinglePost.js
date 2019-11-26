const db = require("../../config");

exports.showSinglePost = (req, res) => {
  const { postId } = req.body;
  const sql = `SELECT * FROM Post WHERE postId = '${postId}'`;

  db.query(sql, (err, result) => {
    console.log(result);
    if (err) res.status(400).json("Cannot get the content of this post");
    return res.status(200).json(result);
  });
};
