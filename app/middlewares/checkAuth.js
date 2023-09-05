const { extractBearer } = require('./../utils/bearer');
const User = require('./../database/models/User');
const Token = require('./../database/models/Token');
const PermissionGp = require('./../database/models/PermissionGp');
const Permission = require('./../database/models/Permission');


exports.checkRoutePermission = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const bearerToken = extractBearer(authHeader);
        req.token = bearerToken;
        const currentRoute = req.path;
        const tokenObject = await Token.findOne({ token: bearerToken });
        const user = await User.findOne({ token_id: tokenObject._id });
        const permissionGp = await PermissionGp.findOne({ _id: user.permissionGp_id });
        const permission = await Permission.find({ permissionGp_id: permissionGp._id, url_route: currentRoute });
        if (permission.length === 0) {
            res.status(403).json({ error: 'Access denied: Insufficient permissions' });
        } else {
            next();
        }
    } else {
        res.status(500).json({ error: 'Bearer Token is missing' });
    }
}