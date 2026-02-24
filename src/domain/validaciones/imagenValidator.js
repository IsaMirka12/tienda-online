const Joi = require("joi");

const imagenSchema = Joi.object({
    productoId: Joi.number().integer().required(),
    url: Joi.string(),
    esPrincipal: Joi.number().required(),
    estado: Joi.number().required(),
});

const imagenUpdateSchema = imagenSchema.fork(Object.keys(imagenSchema.describe().keys), (schema) => schema.optional());

module.exports = {imagenSchema, imagenUpdateSchema};