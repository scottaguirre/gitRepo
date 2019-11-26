const router = require("express").Router();
const Post = require("./createPost");
const Posts = require("./showAllPosts");
const Delete = require("./deletePost");
const singlePost = require("./showSinglePost");
const verifyToken = require("../auth");
const validator = require("./validator");
const update = require("./updateSinglePost");

router.post("/create", validator.createPost, verifyToken, Post.createPost);
router.post("/showPosts", Posts.showAllPosts);
router.post("/delete", verifyToken, Delete.deletePost);
router.get("/showSinglePost", singlePost.showSinglePost);
router.post("/update", verifyToken, update.updateSinglePost);

module.exports = router;
