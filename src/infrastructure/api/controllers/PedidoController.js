class PedidoController {
    constructor(pedidoService) { this.pedidoService = pedidoService; }

    async obtenerPedidoPorId(req, res) {
        try {
            const pedido = await this.pedidoService.obtenerPedidoPorId(req.params.id);
            if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });
            res.json(pedido);
        } catch (err) { res.status(500).json({ message: err.message }); }
    }

    async obtenerTodosLosPedidos(req, res) {
        try {
            const pedidos = await this.pedidoService.obtenerTodosLosPedidos();
            if (!pedidos.length) return res.status(404).json({ message: 'No hay pedidos' });
            res.json(pedidos);
        } catch (err) { res.status(500).json({ message: err.message }); }
    }

    async agregarPedido(req, res) {
        try {
            const pedidoCreado = await this.pedidoService.agregarPedido(req.body);
            res.status(201).json({ status: true, message: 'Pedido creado exitosamente', data: pedidoCreado });
        } catch (err) {
            if (err.message.startsWith("Error de validación")) return res.status(400).json({ status: false, message: err.message });
            res.status(500).json({ status: false, message: err.message });
        }
    }

    async eliminarPedidoPorId(req, res) {
        try {
            const mensaje = await this.pedidoService.eliminarPedidoPorId(req.params.id);
            res.status(mensaje.status ? 200 : 404).json(mensaje);
        } catch (err) { res.status(500).json({ status: false, message: err.message }); }
    }

    async editarPedido(req, res) {
        try {
            const actualizado = await this.pedidoService.editarPedido(req.params.id, req.body);
            if (!actualizado) return res.status(404).json({ status: false, message: 'Pedido no encontrado' });
            res.json({ status: true, message: 'Pedido actualizado exitosamente' });
        } catch (err) { res.status(500).json({ status: false, message: err.message }); }
    }
}

module.exports = PedidoController;