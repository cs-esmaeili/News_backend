const { Router } = require("express");

const userPost = require("../../controllers/user/post");
const adminPost = require("../../controllers/admin/post");

const router = new Router();

router.post("/postList", userPost.postList);
router.post("/createPost", adminPost.createPost);

module.exports = router;