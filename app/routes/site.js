const { Router } = require("express");

const firstPage = require("../controllers/firstPage");

const router = new Router();

router.post("/categorys", firstPage.categorys);
router.post("/firstPage", firstPage.firstPage);

module.exports = router;