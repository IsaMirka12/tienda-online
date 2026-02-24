const Joi = require("joi");

const usuarioSchema = Joi.object({
    nombres: Joi.string().required(),
    apellidos: Joi.string().required(),
    correo: Joi.string().email().required(),
    contrasenia: Joi.string().required(),
    rol: Joi.string().valid("admin", "cliente").required(),
    estado: Joi.number().valid(0, 1).optional()   
});

const usuarioUpdateSchema = usuarioSchema.fork(Object.keys(usuarioSchema.describe().keys), (schema) => schema.optional());

module.exports = { usuarioSchema, usuarioUpdateSchema };