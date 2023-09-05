const { Router } = require("express");

const post = require("../../controllers/user/post");

const router = new Router();

router.post("/postList", post.postList);

module.exports = router;