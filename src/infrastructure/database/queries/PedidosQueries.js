module.exports = {
    OBTENER_PEDIDO_ID: 'SELECT * FROM pedido WHERE id = ?',
    OBTENER_DETALLE_PEDIDO: 'SELECT * FROM pedido_detalle WHERE pedido_id = ?',
    OBTENER_TODOS_PEDIDOS: 'SELECT * FROM pedido',
    INSERTAR_PEDIDO: 'INSERT INTO pedido (cliente_id, fecha, total, metodo_pago, estado, numeroPedido) VALUES (?, ?, ?, ?, ?, ?)',
    INSERTAR_DETALLE_PEDIDO: 'INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
    ELIMINAR_PEDIDO_ID: 'UPDATE pedido SET estado = "cancelado" WHERE id = ?',
    EDITAR_PEDIDO: 'UPDATE pedido SET total = IFNULL(?, total), estado = IFNULL(?, estado) WHERE id = ?'
};