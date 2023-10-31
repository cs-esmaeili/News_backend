const { Router } = require("express");

const category = require("./subRoutes/category");
const role = require("./subRoutes/role");
const post = require("./subRoutes/post");
const file = require("./subRoutes/file");

const router = new Router();

router.use("/role", role);
router.use("/category", category);
router.use("/post", post);
router.use("/file", file);


module.exports = router;