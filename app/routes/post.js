const { Router } = require("express");

const postController = require("../controllers/postController");

const router = new Router();

router.post("/postList", postController.postList);

module.exports = router;