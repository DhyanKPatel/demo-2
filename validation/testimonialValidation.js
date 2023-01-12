const Joi = require('joi');

function validateAddTestimonial(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            "string.base": `Testimonial Name should be a type of 'text'`,
            "string.empty": `Testimonial Name cannot be an empty field`,
            "any.required": `Testimonial Name is a required field`,
        }),
        designation: Joi.string().min(3).required().messages({
            "string.base": `Designation should be a type of 'text'`,
            "string.empty": `Designation cannot be an empty field`,
            "any.required": `Designation is a required field`,
        }),
        description: Joi.string().min(3).required().messages({
            "string.base": `Testimonial Description should be a type of 'text'`,
            "string.empty": `Testimonial Description cannot be an empty field`,
            "any.required": `Testimonial Description is a required field`,
        }),
       


    });
    return schema.validate(req);
}
module.exports = {
    validateAddTestimonial
};