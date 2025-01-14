const ProductoRepository = require('../../domain/repositories/ProductoRepository.js');
const pool = require('./MySQLConnection');
const queries = require('./queries/ProductoQueries.js');
const Producto = require('../../domain/entities/Producto.js');

class ProductoMySQLRepository extends ProductoRepository {
  async obtenerProductoPorId(id) {
    const [rows] = await pool.query(queries.OBTENER_PRODUCTO_ID, [id]);
    if (rows.length === 0) return null;

    const { id:idProducto, nombre, descripcion, precio, stock, categoria_id, estado } = rows[0];
    return new Producto (idProducto, nombre, descripcion, precio, stock, categoria_id, estado);
  }
  async obtenerTodosLosProductos() {
    const [rows] = await pool.query(queries.OBTENER_TODOS_PRODUCTOS, []);
    if (rows.length === 0) return null;
    return rows.map(producto=> {
      const { id:idProducto, nombre, descripcion, precio, stock, categoria_id, estado } = producto;
      return new Producto (idProducto, nombre, descripcion, precio, stock, categoria_id, estado);
    })
    
  }

}

module.exports = ProductoMySQLRepository;
