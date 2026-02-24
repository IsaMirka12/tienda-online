const Joi = require("joi");

const categoriaSchema = Joi.object({
    nombre: Joi.string().required(),
});

const categoriaUpdateSchema = categoriaSchema.fork(Object.keys(categoriaSchema.describe().keys), (schema) => schema.optional());


module.exports = { categoriaSchema, categoriaUpdateSchema };