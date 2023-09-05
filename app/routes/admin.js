const { Router } = require("express");

const adminController = require("../controllers/admin/admin");
const adminCategory = require("../controllers/admin/category");

const router = new Router();

router.post("/logIn", adminController.logIn);
router.post("/register", adminController.register);
router.post("/createCategory", adminCategory.createCategory);

module.exports = router;