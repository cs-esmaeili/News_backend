const { Router } = require("express");

const post = require("./subRoutes/post");
const router = new Router();

router.use("/post", post);

module.exports = router;