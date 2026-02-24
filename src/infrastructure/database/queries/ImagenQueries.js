module.exports = {
    OBTENER_IMAGEN_ID: 'SELECT * FROM imagenes WHERE idImagen = ?',
    OBTENER_TODAS_IMAGENES: 'SELECT * FROM imagenes',
    INSERTAR_IMAGEN: 'INSERT INTO imagenes (productoId, url, esPrincipal) VALUES (?, ?, ?)',
    ELIMINAR_IMAGEN_ID: `UPDATE  imagenes SET estado = 0 WHERE idImagen = ?`,
    EDITAR_IMAGEN: `UPDATE imagenes 
    SET ProductoId = IFNULL(?, ProductoId), url = IFNULL(?, url),
    esPrincipal = IFNULL(?, esPrincipal) , estado= IFNULL(?, estado) WHERE idImagen = ?`
};
  