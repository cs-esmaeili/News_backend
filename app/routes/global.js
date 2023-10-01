const { Router } = require("express");
const adminController = require("../controllers/admin/admin");

const router = new Router();

router.post("/logIn", adminController.logIn);
router.post("/register", adminController.register);


module.exports = router;

