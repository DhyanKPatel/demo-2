const Joi = require('joi');
function validateAddCategory(req) {
    const schema = Joi.object({
        category_name: Joi.string().min(3).required().messages({
            "string.base": `Category Name should be a type of 'text'`,
            "string.empty": `Category Name cannot be an empty field`,
            "any.required": `Category Name is a required field`,
        }),

    });
    return schema.validate(req);
}
module.exports = {
    validateAddCategory
};