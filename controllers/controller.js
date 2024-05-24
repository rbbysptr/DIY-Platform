const Model = require("../models/model");

class Controller {
    static async home(req, res) {
        try {
            res.render("Home");
        } catch (error) {
            res.send(error.message);
        }
    }
    static async getAuthors(req,res) {
        try {
            let data = await Model.readAuthors();
            res.render("Authors", { data });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async getAuthorsDetail(req, res) {
        try {
            let data = await Model.AuthorsDetail();
            res.render("AuthorsDetail", { data });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async getPosts(req, res) {
        try {
            let { search } = req.query;
            let data = await Model.readPosts(search);
            res.render("Posts", { data });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async getPostsDetail(req, res) {
        try {
            let { id } = req.params;
            let data = await Model.getPostDetail(id);
            res.render("PostsDetail", { data });
        } catch (error) {
            res.send(error.message)
        }
    }
    static async getAddPosts(req,res) {
        try {
            let { error } = req.query;
            let data = await Model.readAuthors();
            res.render("PostsAdd",{data,error})
        } catch (error) {
            res.send(error);
        }
    }
    static async postsAdd(req, res) {
        try {
            let dataPost = req.body;
            await Model.postsAdd(dataPost);
            res.redirect("/Posts");
        } catch (error) {
            res.redirect(`/Posts/add?error=${error}`);
        }
    }
    static async getEditPost(req, res) {
        try {
            let { error } = req.query;
            let { id } = req.params;
            let data = await Model.readAuthors();
            let dataPost = await Model.getPostDetail(id);
            res.render("PostsEdit", { data, dataPost,error });
        } catch (error) {
            res.send(error)
        }
    }
    static async postEditPost(req, res) {
        try {
            let { id } = req.params;
            let dataPost = req.body;
            await Model.postEditPost(id, dataPost);
            res.redirect("/Posts");
        } catch (error) {
            let { id } = req.params;
            res.redirect(`/posts/${id}/edit?error=${error}`);
        }
    }
    static async deletePosts(req, res) {
        try {
            let { id } = req.params;
            await Model.deletePosts(id);
            res.redirect("/Posts");
        } catch (error) {
            res.send(error.message);
        }
    }
    static async votePosts(req, res) {
        try {
            let { id } = req.params;
            await Model.votePosts(id);
            res.redirect(`/posts/${id}`);
        } catch (error) {
            res.send(error.message);
        }
    }
}

module.exports = Controller;