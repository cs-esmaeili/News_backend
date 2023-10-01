const { extractBearer } = require('./../utils/bearer');
const User = require('./../database/models/User');
const Token = require('./../database/models/Token');
const PermissionGp = require('./../database/models/PermissionGp');
const Permission = require('./../database/models/Permission');


exports.checkRoutePermission = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const currentRoute = req.path;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const bearerToken = extractBearer(authHeader);
            req.token = bearerToken;
            const tokenObject = await Token.findOne({ token: bearerToken });
            if (tokenObject == null) {
                res.status(500).json({ error: 'Bearer Token is wrong' });
                return;
            }
            const user = await User.findOne({ token_id: tokenObject._id });
            const permissionGp = (await PermissionGp.findOne({ _id: user.permissionGp_id })).permissions;
            const permission = await Permission.find({ _id: { $in: permissionGp }, route: currentRoute });
            if (permission.length === 0) {
                res.status(403).json({ error: 'Access denied: Insufficient permissions' });
                return;
            }
            req.body.user = user;
            next();
        } else {
            res.status(500).json({ error: 'Bearer Token is missing' });
            return;
        }
    } catch (error) {
        res.status(error.statusCode || 500).json("Server Error");
    }
}