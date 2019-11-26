const router = require("express").Router();
const db = require("../config");
const verifyToken = require("./auth");

router.delete("/", verifyToken, async (req, res) => {
  const { userId } = req.token;

  try {
    db.query(`DELETE FROM User WHERE userId = '${userId}'`, (err, result) => {
      if (err) return res.sendStatus(400).json("Could not delete record");
      res.status(200).json(result);
    });
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
