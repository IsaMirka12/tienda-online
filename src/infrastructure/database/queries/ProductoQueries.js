module.exports = {
    OBTENER_PRODUCTO_ID: 'SELECT * FROM productos WHERE id = ?',
    OBTENER_TODOS_PRODUCTOS: 'SELECT * FROM productos',
    INSERTAR_PRODUCTOS: 'INSERT INTO productos (nombre, descripcion, precio, imagen, categoria_id, estado) VALUES (?, ?, ?, ?, ?, ?)',
    ELIMINAR_PRODUCTO_ID: `UPDATE productos SET estado = 0 WHERE id = ?`,
    EDITAR_PRODUCTO: `UPDATE productos 
    SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion),
    precio = IFNULL(?, precio) , imagen= IFNULL(?, imagen), 
    categoria_id = IFNULL(?, categoria_id),estado= IFNULL(?, estado)  WHERE id = ?`
};
  