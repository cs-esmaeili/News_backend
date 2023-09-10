const { Router } = require("express");

const permissionGp = require("../../controllers/admin/permissionGp");

const router = new Router();

router.post("/createPermissionGp", permissionGp.createPermissionGp);
router.post("/deletePermissionGp", permissionGp.deletePermissionGp);
router.post("/updatePermissionGp", permissionGp.updatePermissionGp);

module.exports = router;