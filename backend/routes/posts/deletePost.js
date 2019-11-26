const db = require("../../config");

exports.deletePost = (req, res) => {
  const { userId } = req.token;
  const { postId } = req.body;
  const sql = `SELECT * FROM Post WHERE  postId = '${postId}'`;
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) return res.status(400).json("An error ocurred: " + err);
    if (result.length <= 0) return res.status(200).json("No posts to show");

    const { userId: postUserId } = result[0];
    if (postUserId === userId) {
      const deleteSql = `DELETE FROM Post WHERE postId = '${postId}'`;
      db.query(deleteSql, (err, result) => {
        if (err)
          return res
            .status(400)
            .json("Could not delete post, an error ocurred");
        console.log(result);
        return res.status(200).json("Post deleted successfully");
      });
    }
  });
};
