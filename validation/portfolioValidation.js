const Joi = require('joi');
function validateAddPortfolio(req) {
    const schema = Joi.object({
        project_category: Joi.required().messages({
            "string.base": `Project Category should be a type of 'text'`,
            "string.empty": `Project Category  cannot be an empty field`,
            "any.required": `Project Category  is a required field`,
        }),
        porject_name: Joi.string().min(3).required().messages({
            "string.base": `Project Name should be a type of 'text'`,
            "string.empty": `Project Name cannot be an empty field`,
            "any.required": `Project Name is a required field`,
        }),
        porject_title: Joi.string().min(3).required().messages({
            "string.base": `Project Title should be a type of 'text'`,
            "string.empty": `Project Title cannot be an empty field`,
            "any.required": `Project Title is a required field`,
        }),
        porject_date: Joi.required().messages({
            "any.required": `date is a required field`,
        }),
        description: Joi.string().min(3).required().messages({
            "string.base": `Project Description should be a type of 'text'`,
            "string.empty": `Project Description cannot be an empty field`,
            "any.required": `Project Description is a required field`,
        }),
       

    });
    return schema.validate(req);
}

function idValidate(req) {
    const schema = Joi.object({

        id: Joi.array().empty().required().messages({
            "string.base": `URL should be a type of text`,
            "string.empty":'URL  is not allowed to be empty',
            "string.required": `URL is Required`,
          }),
    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
}
module.exports = {
    validateAddPortfolio,
    idValidate
};