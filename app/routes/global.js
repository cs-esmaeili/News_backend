const { Router } = require("express");
const adminController = require("../controllers/admin/admin");
const fileController = require("../controllers/admin/file");

const router = new Router();

router.post("/logIn", adminController.logIn);
router.post("/register", adminController.register);
router.get("/file/:file_id", fileController.file);


module.exports = router;

