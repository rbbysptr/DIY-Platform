const express = require("express");
const posts = express.Router();
const Controller = require("../controllers/controller");

posts.get("/", Controller.getPosts);

posts.get("/add", Controller.getAddPosts);

posts.post("/add", Controller.postsAdd);

posts.get("/:id", Controller.getPostsDetail);

posts.get("/:id/edit", Controller.getEditPost);

posts.post("/:id/edit", Controller.postEditPost);

posts.get("/:id/delete", Controller.deletePosts);

posts.get("/:id/vote", Controller.votePosts)

module.exports = posts;