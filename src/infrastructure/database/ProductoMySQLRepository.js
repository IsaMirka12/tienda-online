const ProductoRepository = require('../../domain/repositories/ProductoRepository.js');
const pool = require('./MySQLConnection');
const queries = require('./queries/ProductoQueries.js');
const Producto = require('../../domain/entities/Producto.js');

class ProductoMySQLRepository extends ProductoRepository {
  async obtenerProductoPorId(id) {
    const [rows] = await pool.query(queries.OBTENER_PRODUCTO_ID, [id]);
    if (rows.length === 0) return null;

    const { id : idproducto, nombre, descripcion, precio, imagen, categoria_id, estado } = rows[0];
    return new Producto (idproducto, nombre, descripcion, precio, imagen, categoria_id, estado);
  }
  async obtenerTodosLosProductos() {
    const [rows] = await pool.query(queries.OBTENER_TODOS_PRODUCTOS, []);
    if (rows.length === 0) return null;
    return rows.map(producto=> {
      const { id, nombre, descripcion, precio, imagen, categoria_id, estado } = producto;
      return new Producto (id, nombre, descripcion, precio, imagen, categoria_id, estado);
    }) 
  }

  async insertarProducto(producto) {
    const { nombre, descripcion, precio, imagen, categoria_id, estado } = producto;
    const [result] = await pool.query(queries.INSERTAR_PRODUCTOS, [
        nombre,
        descripcion,
        precio,
        imagen,
        categoria_id,
        estado || true 
    ]);
    return new Producto(result.insertId, nombre, descripcion, precio, imagen, categoria_id, estado || true);
}

  async eliminarProductoPorId(id) {
    const [rows] = await pool.query(queries.ELIMINAR_PRODUCTO_ID, [id]);
    console.log('Resultado de la consulta:', rows);
    if (rows.affectedRows === 0) {
      return { status: false,message: 'Producto no encontrado' };
    }
    return { status: true, message: 'Producto eliminado correctamente' };
  }

  async editarProducto(id, datosProducto) {
    const { nombre, descripcion, precio, imagen, categoria_id } = datosProducto;
    const [result] = await pool.query(queries.EDITAR_PRODUCTO,[
      datosProducto.nombre,
      datosProducto.descripcion,
      datosProducto.precio,
      datosProducto.imagen,
      datosProducto.categoria_id,
      datosProducto.estado,
      id
    ]
    );
    return result;
  }

}

module.exports = ProductoMySQLRepository;
