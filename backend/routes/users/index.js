const router = require("express").Router();
const User = require("./createUser");
const Login = require("./login");
const verifyToken = require("../auth");
const validator = require("./validator");

router.post("/create", validator.createValidator, User.createUser);

router.post("/login", Login.login);

module.exports = router;
