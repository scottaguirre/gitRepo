const db = require("../../config");

exports.updateSinglePost = (req, res) => {
  const { userId } = req.token;
  const { postId, title, image, blog_Body } = req.body;

  const sql = `SELECT userId FROM Post WHERE postId = '${postId}'`;
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(400).json("An error ocurred, cannot update this post");
    }
    if (result.length <= 0) {
      return res.status(400).json("Post id does not exist");
    }

    if (userId === result[0].userId) {
      const updateSql = `UPDATE Post SET title = '${title}',
        blogBody = '${blog_Body}',
        image= '${image}'
        WHERE postId = '${postId}'`;

      db.query(updateSql, (err, result) => {
        console.log(result);
        if (err) return res.status(400).json("Could not update this post");
        res.status(200).json(result);
      });
    }
  });
};
