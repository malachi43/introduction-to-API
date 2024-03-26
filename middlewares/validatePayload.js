const joi = require("joi")

async function validateUserPayload(req, res, next) {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    })

    await schema.validateAsync(req.body)
    next()
}

module.exports = validateUserPayload