const PermissionGp = require('../../database/models/PermissionGp');
const mongoose = require('mongoose');
const { mCreatePermissionGp } = require('../../../messages.json');

exports.createPermissionGp = async (req, res, next) => {
    try {
        const { name, permissions } = req.body;
        const convertedPermissions = permissions.map(id => new mongoose.Types.ObjectId(id));
        const result = await PermissionGp.create({
            name,
            permissions: convertedPermissions,
        });

        if (result) {
            res.send({ status: "ok", message: mCreatePermissionGp.ok });
        } else {
            res.send({ status: "fail", message: mCreatePermissionGp.fail });
        }

    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}
