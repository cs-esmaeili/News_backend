const { utcToJalali } = require('./../utils/TimeConverter');

exports.convertTimestamps = (req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        const convertedData = convertTimes(data);
        originalJson.call(this, convertedData);
    };

    next();
}

function convertTimes(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (obj instanceof Array) {
        return obj.map(item => convertTimes(item));
    }

    const updatedObj = { ...obj };

    if (updatedObj.hasOwnProperty('createdAt')) {
        updatedObj.createdAt = utcToJalali(updatedObj.createdAt);
    }

    if (updatedObj.hasOwnProperty('updatedAt')) {
        updatedObj.updatedAt = utcToJalali(updatedObj.updatedAt);;
    }

    for (const key in updatedObj) {
        updatedObj[key] = convertTimes(updatedObj[key]);
    }

    return updatedObj;
}