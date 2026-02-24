const Joi = require('joi');

const detalleSchema = Joi.object({
    productoId: Joi.number().integer().required(),
    cantidad: Joi.number().integer().min(1).required(),
    precioUnitario: Joi.number().precision(2).required()
});

const pedidoSchema = Joi.object({
    clienteId: Joi.number().integer().required(),
    total: Joi.number().precision(2).required(), // <-- agregado
    metodoPago: Joi.string().required(),
    estado: Joi.string().valid('pendiente', 'pagado', 'enviado', 'cancelado').default('pendiente'),
    numeroPedido: Joi.string().required(),
    detalles: Joi.array().items(detalleSchema).min(1).required()
});
const pedidoUpdateSchema = Joi.object({
    estado: Joi.string().valid('pendiente', 'pagado', 'enviado', 'cancelado'),
    total: Joi.number().precision(2)
});

module.exports = { pedidoSchema, pedidoUpdateSchema };