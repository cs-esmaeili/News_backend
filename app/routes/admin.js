const { Router } = require("express");

const adminController = require("../controllers/admin/admin");
const category = require("./category/category");
const permissionGp = require("./permissionGp/permissionGp");
const post = require("./post/post");

const router = new Router();

router.post("/logIn", adminController.logIn);
router.post("/register", adminController.register);
router.use("/permissionGp", permissionGp);
router.use("/category", category);
router.use("/post", post);


module.exports = router;