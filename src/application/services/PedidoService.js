const Pedido = require("../../domain/entities/Pedido");
const { pedidoSchema, pedidoUpdateSchema } = require("../../domain/validaciones/pedidoValidator");

class PedidoService {
    constructor(pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    async obtenerPedidoPorId(id) { return this.pedidoRepository.obtenerPedidoPorId(id); }
    async obtenerTodosLosPedidos() { return this.pedidoRepository.obtenerTodosLosPedidos(); }

    async agregarPedido(pedidoData) {
        const { error } = pedidoSchema.validate(pedidoData, { abortEarly: false });
        if (error) throw new Error(`Error de validación: ${error.details.map(e => e.message).join(", ")}`);

        const pedido = new Pedido(
            null,
            pedidoData.clienteId,
            new Date(),
            pedidoData.total,
            pedidoData.metodoPago,
            pedidoData.estado,
            pedidoData.numeroPedido
        );

        pedido.detalles = pedidoData.detalles;

        return await this.pedidoRepository.insertarPedido(pedido);
    }

    async eliminarPedidoPorId(id) { return this.pedidoRepository.eliminarPedidoPorId(id); }

    async editarPedido(id, datosPedido) {
        const { error } = pedidoUpdateSchema.validate(datosPedido, { abortEarly: false });
        if (error) throw new Error(`Error de validación: ${error.details.map(e => e.message).join(", ")}`);

        return this.pedidoRepository.editarPedido(id, datosPedido);
    }
}

module.exports = PedidoService;