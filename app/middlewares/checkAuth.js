const { extractBearer } = require('./../utils/bearer');
const User = require('./../database/models/User');
const Token = require('./../database/models/Token');
const PermissionGp = require('./../database/models/PermissionGp');
const Permission = require('./../database/models/Permission');


exports.checkRoutePermission = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const bearerToken = extractBearer(authHeader);
            req.token = bearerToken;
            const currentRoute = req.path;
            const tokenObject = await Token.findOne({ token: bearerToken });
            const user = await User.findOne({ token_id: tokenObject._id });
            const permissionGp = (await PermissionGp.findOne({ _id: user.permissionGp_id })).permissions;
            const permission = await Permission.find({ _id: { $in: permissionGp }, route: currentRoute });
            if (permission.length === 0) {
                res.status(403).json({ error: 'Access denied: Insufficient permissions' });
            } else {
                next();
            }
        } else {
            res.status(500).json({ error: 'Bearer Token is missing' });
        }
    } catch (error) {
        res.status(error.statusCode || 500).json("Server Error");
    }
}