const joi = require('joi');

const validator = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().max(20).min(3).trim().pattern(new RegExp('^([a-z]+)( [a-z]+)*$', 'i')).required().messages({
            'string.min': 'firstName / Please, enter a name that is at least 3 characters long',
            'string.max': "firstName / Your name should contain a maximum of 20 characters"
        }),
        lastName: joi.string().max(20).min(2).trim().pattern(new RegExp('^([a-z]+)( [a-z]+)*$', 'i')).required().messages({
            // 'string.min': 'lastName / Your lastname  should contain at least 2 characters',
            'string.max': "lastName / Your last name should contain a maximum of 20 characters"
            //^([a-z]+)( [a-z]+)*$
        }),
        email: joi.string().email({ minDomainSegments: 2 }).required().messages({
            'string.email': 'Invalid email address format'
        }),
        password: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).required().trim().min(8).max(30).messages({
            'string.min': 'Your password should be at least 8 characters long and it should contain  lowercase, uppercase and numbers',
            'string.pattern': "Your password should be alphanumeric with at least 1 number"
        }),
        picture: joi.string(),
        country: joi.string(),
        from: joi.string()
    })
    const validation = schema.validate(req.body.userData, { abortEarly: false })
    if (validation.error) {
        return res.json({ success: false, message: validation.error.details })
    }
    next()
}

module.exports = validator