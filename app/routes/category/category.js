const { Router } = require("express");

const category = require("../../controllers/admin/category");

const router = new Router();

router.post("/createCategory", category.createCategory);

module.exports = router;