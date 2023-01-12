const Joi = require('joi');
function validateAddContact(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            "string.base": `Contact Name should be a type of 'text'`,
            "string.empty": `Contact Name cannot be an empty field`,
            "any.required": `Contact Name is a required field`,
        }),
        email: Joi.string().min(3).required().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        number: Joi.number().min(3).required().messages({
            "number.empty": `Contact number cannot be an empty field`,
            "number.min": "Contact number must be 10 digit",
            "number.max": "Contact number can't be greater than 10 digit",
            "any.required": `Contact number is a required field`,
        }),
        message: Joi.string().min(3).required().messages({
            "string.base": `Message should be a type of 'text'`,
            "string.empty": `Message cannot be an empty field`,
            "any.required": `Message is a required field`,
        }),
        date: Joi.required().messages({
            "any.required": `date is a required field`,
        })


    });
    return schema.validate(req);
}
module.exports = {
    validateAddContact
};