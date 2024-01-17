const momentZone = require('moment-timezone');

const converTimeToTehran = (time) => {
    let tehranDate = momentZone(time).tz('Asia/Tehran');
    let result = new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(tehranDate.toDate()) + " " + tehranDate.format('HH:mm:ss');
    return result;
}
exports.checkLogInTime = (minTime) => {
    try {


        let currentTime = new Date().getTime();
        currentTime = converTimeToTehran(currentTime);

        let expireTime = new Date(minTime);
        expireTime.setMinutes(parseInt(expireTime.getMinutes()) + parseInt(process.env.USERS_SESSIONS_TIME));
        expireTime = momentZone(expireTime).tz('Asia/Tehran').format('YYYY/MM/DD HH:mm:ss');

        if (currentTime > minTime && currentTime < expireTime) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}