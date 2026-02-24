// src/domain/validaciones/productoValidaciones.js
const Joi = require("joi");

const productoSchema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().optional().allow(""),
    precio: Joi.number().precision(2).required(),
    imagen: Joi.string().optional().allow(""),
    categoria_id: Joi.number().integer().required(),
    estado: Joi.number().valid(0, 1).optional() 
});

const productoUpdateSchema = productoSchema.fork(
    Object.keys(productoSchema.describe().keys),
    (schema) => schema.optional()
);

module.exports = { productoSchema, productoUpdateSchema };