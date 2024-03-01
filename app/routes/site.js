const { Router } = require("express");

const firstPage = require("../controllers/firstPage");

const router = new Router();

router.post("/categorys", firstPage.categorys);

module.exports = router;