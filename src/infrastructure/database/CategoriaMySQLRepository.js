const CategoriaRepository = require('../../domain/repositories/CategoriaRepository.js');
const pool = require('./MySQLConnection');
const queries = require('./queries/CategoriaQueries.js');
const Categoria = require('../../domain/entities/Categoria.js');

class CategoriaMySQLRepository extends CategoriaRepository {
  async obtenerCategoriaPorId(id)  {
    const [rows] = await pool.query(queries.OBTENER_CATEGORIA_ID, [id]);
    if (rows.length === 0) return null;

    const { idCategoria, nombre, descripcion, createdAt } = rows[0];
    return new Categoria (idCategoria, nombre, descripcion, createdAt);
  }
  async obtenerTodasLasCategorias() {
    const [rows] = await pool.query(queries.OBTENER_TODAS_CATEGORIAS, []);
    console.log(rows); 
    if (rows.length === 0) return null;
    return rows.map(categoria=> {
      const { id, nombre  } = categoria;
      return new Categoria (id, nombre);
    })
    
  }
    async insertarCategoria(categoria) {
      const { nombre, descripcion} = categoria;
      const [result] = await pool.query(queries.INSERTAR_CATEGORIA, [
          nombre,
          descripcion
      ]);
      return new Categoria(result.insertId, nombre, descripcion);
  }
  async eliminarCategoriaPorId(id) {
    const [rows] = await pool.query(queries.ELIMINAR_CATEGORIA_ID, [id]);
    console.log('Resultado de la consulta:', rows);
    if (rows.affectedRows === 0) {
      return { status: false,message: 'La categoria no se encontró' };
    }
    return { status: true, message: 'Categoría eliminada correctamente' };
  }

  async editarCategoria(id, datosCategoria) {
    const { nombre, descripcion} = datosCategoria;
    const [result] = await pool.query(queries.EDITAR_CATEGORIA,[
      datosCategoria.nombre,
      datosCategoria.descripcion,
      id
    ]
    );
    return result;
  }
  

}

module.exports = CategoriaMySQLRepository;
