const { body } = require("express-validator");

exports.createValidator = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("cannot be empty")
    .trim()
    .escape(),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("cannot be empty")
    .trim()
    .escape(),
  body("username")
    .not()
    .isEmpty()
    .withMessage("Cannot be empty")
    .trim()
    .escape(),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("must contain a number"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("cannot be empty")
    .isEmail()
    .withMessage("has to have a valid value")
    .normalizeEmail()
];
