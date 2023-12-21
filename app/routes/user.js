const { Router } = require("express");

const user = require("../controllers/user");

const router = new Router();

router.post("/registerPure", user.registerPure);

module.exports = router;