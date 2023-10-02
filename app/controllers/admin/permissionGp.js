const PermissionGp = require('../../database/models/PermissionGp');
const User = require('../../database/models/User');
const mongoose = require('mongoose');
const { transaction } = require('../../database');
const { mCreatePermissionGp, mUpdatePermissionGp, mDeletePermissionGp } = require('../../../messages.json');

exports.createPermissionGp = async (req, res, next) => {
    try {
        const { name, permissions } = req.body;
        const convertedPermissions = permissions.map(id => new mongoose.Types.ObjectId(id));
        const result = await PermissionGp.create({
            name,
            permissions: convertedPermissions,
        });
        if (result) {
            res.send({ message: mCreatePermissionGp.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mCreatePermissionGp.fail };
        throw error;
    } catch (err) {
        res.status(err.statusCode || 422).json(err.message);
    }
}
exports.deletePermissionGp = async (req, res, next) => {
    try {
        const { permissionGp_id, newPermissionGp_id } = req.body;
        const result = transaction(async () => {
            const deletedResult = await PermissionGp.deleteOne({ _id: permissionGp_id });
            if (deletedResult.deletedCount == 0) {
                const error = new Error();
                error.message = "permissionGp_id for delete notFound !";
                throw error;
            }
            const updateResult = await User.updateMany({ permissionGp_id }, { permissionGp_id: newPermissionGp_id });
            if (updateResult.modifiedCount == 0) {
                const error = new Error();
                error.message = "newPermissionGp_id for update notFound !";
                throw error;
            }
        });
        if (result) {
            res.send({ message: mDeletePermissionGp.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mDeletePermissionGp.fail };
        throw error;
    } catch (err) {
        res.status(err.statusCode || 422).json(err.message);
    }
}
exports.updatePermissionGp = async (req, res, next) => {
    try {
        const { permissionGp_id, name, permissions } = req.body;
        const updateResult = await PermissionGp.updateOne({ _id: permissionGp_id }, { name, permissions });
        if (updateResult.modifiedCount == 1) {
            res.send({ status: "ok", message: mUpdatePermissionGp.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mUpdatePermissionGp.fail };
        throw error;
    } catch (err) {
        res.status(err.statusCode || 422).json(err.message);
    }
}