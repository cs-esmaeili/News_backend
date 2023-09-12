const { Router } = require("express");

const userPost = require("../../controllers/user/post");
const adminPost = require("../../controllers/admin/post");

const router = new Router();

router.post("/postList", userPost.postList);
router.post("/postSerach", userPost.postSerach);
router.post("/createPost", adminPost.createPost);
router.post("/updatePost", adminPost.updatePost);
router.post("/deletePost", adminPost.deletePost);

module.exports = router;