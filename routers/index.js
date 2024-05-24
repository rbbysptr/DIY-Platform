const express = require("express");
const router = express.Router();
const authors = require("./authors");
const posts = require("./posts");
const Controller = require("../controllers/controller");

router.get("/", Controller.home);

router.use("/authors", authors);
router.use("/posts", posts);

module.exports = router;