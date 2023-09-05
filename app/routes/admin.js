const { Router } = require("express");

const adminController = require("../controllers/admin/admin");
const category = require("./category/category");

const router = new Router();

router.post("/logIn", adminController.logIn);
router.post("/register", adminController.register);
router.use("/category", category);

module.exports = router;