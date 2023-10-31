const { Router } = require("express");

const role = require("../../controllers/admin/role");

const router = new Router();

router.post("/createPermissionGp", role.createPermissionGp);
router.post("/deletePermissionGp", role.deletePermissionGp);
router.post("/updatePermissionGp", role.updatePermissionGp);

module.exports = router;