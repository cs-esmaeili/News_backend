const { Router } = require("express");

const file = require("../../controllers/admin/file");

const router = new Router();

router.post("/saveFile", file.saveFile);

module.exports = router;