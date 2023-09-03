const Yup = require("yup");

const messages = (item, value = null) => {
    const temp = {
        min: `کم تر از ${value} کارکتر نباید باشد`,
        max: `بیشتر از ${value} کارکتر نباید باشد`,
        required: "پرکردن این فیلد الزامی میباشد",
        accepted: "فایل انتخاب نشده است",
        email: "فرمت وارد شده ایمیل نمی باشد",
        moreThan: `مقدار این فیلد باید بیشتر از فیلد ${value} باشد`,
        imageRequired: 'باید تصویری انتخاب شود',
        selectRequired: 'باید یکی از گزینه ها انتخاب شود',
        usernameWrong: "فرمت ایمیل/شماره تلفن صحیح نمی باشد",
    }
    return temp[item];
}

exports.logInschema = Yup.object().shape({
    password: Yup.string()
        .min(4, messages('min', 4))
        .max(255, messages('max', 255))
        .required(messages('required')),
    username: Yup.string("Phone Number")
        .required(messages('required'))
        .test('test-name', messages('usernameWrong'),
            function (value) {
                const phoneRegex = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig;
                let isValidPhone = phoneRegex.test(value);
                if (!isValidPhone || isNaN(value)) {
                    return false;
                }
                return true;
            })
});