const ImagenRepository = require('../../domain/repositories/ImagenRepository.js');
const pool = require('./MySQLConnection');
const queries = require('./queries/ImagenQueries.js');
const Imagen = require('../../domain/entities/Imagen.js');

class ImagenMySQLRepository extends ImagenRepository {
  async obtenerImagenPorId(id) {
    const [rows] = await pool.query(queries.OBTENER_IMAGEN_ID, [id]);
    if (rows.length === 0) return null;

    const { idImagen, productoId, url, esPrincipal, estado } = rows[0];
    return new Imagen (idImagen, productoId, url, esPrincipal, estado);
  }
  async obtenerTodasLasImagenes() {
    const [rows] = await pool.query(queries.OBTENER_TODAS_IMAGENES, []);
    if (rows.length === 0) return null;
    return rows.map(imagen=> {
      const { idImagen, productoId, url, esPrincipal, estado } = imagen;
      return new Imagen (idImagen, productoId, url, esPrincipal, estado);
    }) 
  }

  async insertarImagen(imagen) {
    const { productoId, url, esPrincipal, estado } = imagen;
    const [result] = await pool.query(queries.INSERTAR_IMAGEN, [
        productoId,
        url,
        esPrincipal,
        estado || true 
    ]);
    return new Imagen(result.insertId, productoId, url, esPrincipal, estado || true);
}

  async eliminarImagenPorId(id) {
    const [rows] = await pool.query(queries.ELIMINAR_IMAGEN_ID, [id]);
    console.log('Resultado de la consulta:', rows);
    if (rows.affectedRows === 0) {
      return { status: false,message: 'Imagen no encontrado' };
    }
    return { status: true, message: 'Imagen eliminada correctamente' };
  }

  async editarImagen(id, datosImagen) {
    const {productoId, url, esPrincipal, estado } = datosImagen;
    // Realiza la actualización en la base de datos
    const [result] = await pool.query(queries.EDITAR_IMAGEN,[
      datosImagen.productoId,
      datosImagen.url,
      datosImagen.esPrincipal,
      datosImagen.estado,
      id
    ]
    );
    return result;
  }

}

module.exports = ImagenMySQLRepository;
