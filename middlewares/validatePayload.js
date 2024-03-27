const joi = require("joi")

async function validateUserPayload(req, res, next) {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    })

    await schema.validateAsync(req.body)
    next()
}

async function validateRoomPayload(req, res, next) {
    const schema = joi.object({
        name: joi.string().required(),
        roomType: joi.string().required(),
        price: joi.number().required()
    })

    await schema.validateAsync(req.body)
    next()
}

module.exports = { validateRoomPayload, validateUserPayload }