const mongoose = require("mongoose");
const momentZone = require('moment-timezone');


exports.schemaMaker = (object) => {

    let tempSchema = object;
    if (object.hasOwnProperty('createdAt')) {
        tempSchema = { ...object, createdAt: mongoose.Schema.Types.Mixed }
    }
    const schema = new mongoose.Schema(object);

    const changeDoc = (doc) => {

        function isObject(variable) {
            return (variable !== null && typeof variable === 'object');
        }

        let transformedDoc = doc;
        if (!isObject(doc)) {
            transformedDoc = doc.toObject();
        }
        if (doc.createdAt != null) {
            let tehranDate = momentZone(transformedDoc.createdAt).tz('Asia/Tehran');
            transformedDoc.createdAt = (new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(tehranDate.toDate())) + " " + tehranDate.format('HH:mm:ss');
        }
        if (doc.updatedAt != null) {
            let tehranDate = momentZone(transformedDoc.updatedAt).tz('Asia/Tehran');
            transformedDoc.updatedAt = (new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(tehranDate.toDate())) + " " + tehranDate.format('HH:mm:ss');
        }

        for (let prop in transformedDoc) {
            doc[prop] = transformedDoc[prop];
        }
    }
    schema.post('findOne', (doc) => changeDoc(doc));
    schema.post('find', (doc) => {
        doc.forEach((object) => {
            changeDoc(object)
        })
    });

    return schema;
}


