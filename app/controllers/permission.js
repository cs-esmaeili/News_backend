const Role = require('../database/models/Role');
const { mTogglePermission } = require('../messages/response.json');

exports.togglePermission = async (req, res, next) => {
    const { role_id, permission_id } = req.body;
    try {
        let permissions = (await Role.findOne({ _id: role_id }));
        if (permissions == null) {
            const error = new Error();
            error.message = "Role notFound !";
            throw error;
        }
        permissions = permissions.permissions;
        let result = null;
        if (permissions.includes(permission_id)) {
            permissions.splice(permissions.indexOf(permission_id), 1);
            result = await Role.updateOne({ _id: role_id }, { permissions });
        } else {
            permissions.push(permission_id);
            result = await Role.updateOne({ _id: role_id }, { permissions });
        }
        if (result.modifiedCount == 1) {
            res.send({ message: mTogglePermission.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mTogglePermission.fail };
        throw error;
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}