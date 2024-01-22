const mongoose = require("mongoose");
const { utcToJalali } = require("../../utils/TimeConverter");


exports.schemaMaker = (object) => {

    const schema = new mongoose.Schema(object, {
        timestamps: true
    });

    const changeDoc = (doc) => {

        if (doc == null) {
            return null;
        }

        function isObject(variable) {
            return (variable !== null && typeof variable === 'object');
        }

        let transformedDoc = doc;
        if (!isObject(doc)) {
            transformedDoc = doc.toObject();
        }
        if (doc.createdAt != null) {
            //   transformedDoc.createdAt = utcToJalali(new Date(transformedDoc.createdAt));
        }
        if (doc.updatedAt != null) {
            // transformedDoc.updatedAt = utcToJalali(new Date(transformedDoc.updatedAt));
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


