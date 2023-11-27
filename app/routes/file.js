const { Router } = require("express");

const file = require("../controllers/file");

const router = new Router();

router.post("/saveFile", file.saveFile);
router.post("/deleteFile", file.deleteFile);
router.post("/deleteFolder", file.deleteFolder);
router.post("/folderFileList", file.folderFileList);
router.post("/createFolder", file.createFolder);
router.post("/renameFolder", file.renameFolder);
router.post("/renameFile", file.renameFile);

module.exports = router;