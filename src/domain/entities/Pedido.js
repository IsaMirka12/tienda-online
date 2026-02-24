class Pedido {
    constructor(id, clienteId, fecha, total, metodoPago, estado, numeroPedido) {
       this.id = id;
       this.clienteId = clienteId;
       this.fecha = fecha;
       this.total = total;
       this.metodoPago = metodoPago;
       this.estado = estado;
       this.numeroPedido = numeroPedido;
    }
}

module.exports = Pedido;