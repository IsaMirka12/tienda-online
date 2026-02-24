module.exports = {
    OBTENER_CATEGORIA_ID: 'SELECT * FROM categorias WHERE id = ?',
    OBTENER_TODAS_CATEGORIAS: 'SELECT * FROM categorias',

    INSERTAR_CATEGORIA: 'INSERT INTO categorias (nombre) VALUES (?)',
    ELIMINAR_CATEGORIA_ID: 'DELETE FROM categorias WHERE id = ?',
    EDITAR_CATEGORIA: 'UPDATE categorias SET nombre = IFNULL(?, nombre) WHERE id = ?'
};
  