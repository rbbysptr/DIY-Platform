const express = require("express");
const authors = express.Router();
const Controller = require("../controllers/controller");

authors.get("/", Controller.getAuthors);

authors.get("/detail", Controller.getAuthorsDetail);

module.exports = authors;