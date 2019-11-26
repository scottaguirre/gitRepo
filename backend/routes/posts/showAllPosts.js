const db = require("../../config");

exports.showAllPosts = (req, res) => {
  const sql = `SELECT * FROM Post`;
  db.query(sql, (err, result) => {
    if (err) return res.status(404).json("Could not get posts");
    if (result.length <= 0) res.json("No post to show");

    res.status(200).json(result);
  });
};
