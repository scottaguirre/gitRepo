const { body } = require("express-validator");

exports.createPost = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("cannot be empty")
    .trim()
    .escape(),
  body("blog_Body")
    .not()
    .isEmpty()
    .withMessage("cannot be empty")
    .trim()
    .escape(),
  body("image")
    .not()
    .isEmpty()
    .withMessage("cannot be empty")
    .trim()
    .escape()
];
