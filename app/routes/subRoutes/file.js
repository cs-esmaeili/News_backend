const { Router } = require("express");

const file = require("../../controllers/admin/file");

const router = new Router();

router.post("/saveFile", file.saveFile);
router.delete("/deleteFile", file.deleteFile);
router.delete("/deleteFolder", file.deleteFolder);

module.exports = router;