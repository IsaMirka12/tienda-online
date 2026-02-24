const PedidoRepository = require('../../domain/repositories/PedidosRepository');
const pool = require('./MySQLConnection');
const queries = require('./queries/PedidosQueries');
const Pedido = require('../../domain/entities/Pedido');
const DetallePedido = require('../../domain/entities/DetallePedido');

class PedidoMySQLRepository extends PedidoRepository {

    async obtenerPedidoPorId(id) {
        const [pedidoRows] = await pool.query(queries.OBTENER_PEDIDO_ID, [id]);
        if (!pedidoRows.length) return null;

        const pedidoData = pedidoRows[0];
        const [detallesRows] = await pool.query(queries.OBTENER_DETALLE_PEDIDO, [id]);
        
        pedidoData.detalles = detallesRows.map(d => new DetallePedido(d.id, d.pedido_id, d.producto_id, d.cantidad, d.precio_unitario));

        return new Pedido(
            pedidoData.id,
            pedidoData.cliente_id,
            pedidoData.fecha,
            pedidoData.total,
            pedidoData.metodo_pago,
            pedidoData.estado,
            pedidoData.numeroPedido
        );
    }

    async obtenerTodosLosPedidos() {
        const [rows] = await pool.query(queries.OBTENER_TODOS_PEDIDOS);
        return rows.map(p => new Pedido(p.id, p.cliente_id, p.fecha, p.total, p.metodo_pago, p.estado, p.numeroPedido));
    }

    async insertarPedido(pedido) {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // Insertar pedido
            const [result] = await conn.query(queries.INSERTAR_PEDIDO, [
                pedido.clienteId,
                pedido.fecha,
                pedido.total,
                pedido.metodoPago,
                pedido.estado,
                pedido.numeroPedido
            ]);
            const pedidoId = result.insertId;

            // Insertar detalles
            for (const detalle of pedido.detalles) {
                await conn.query(queries.INSERTAR_DETALLE_PEDIDO, [
                    pedidoId,
                    detalle.productoId,
                    detalle.cantidad,
                    detalle.precioUnitario
                ]);
            }

            await conn.commit();
            return { ...pedido, id: pedidoId };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

    async eliminarPedidoPorId(id) {
        const [result] = await pool.query(queries.ELIMINAR_PEDIDO_ID, [id]);
        return result.affectedRows ? { status: true, message: 'Pedido eliminado correctamente' } : { status: false, message: 'Pedido no encontrado' };
    }

    async editarPedido(id, datosPedido) {
        const [result] = await pool.query(queries.EDITAR_PEDIDO, [
            datosPedido.total,
            datosPedido.estado,
            id
        ]);
        return result.affectedRows;
    }
}

module.exports = PedidoMySQLRepository;