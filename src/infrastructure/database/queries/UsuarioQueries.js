module.exports = {

OBTENER_USUARIO_ID:
'SELECT * FROM usuarios WHERE id = ?',

OBTENER_TODOS_USUARIO:
'SELECT * FROM usuarios',

INSERTAR_USUARIO:
`INSERT INTO usuarios 
(nombres, apellidos, correo, contrasenia, rol) 
VALUES (?, ?, ?, ?, ?)`,

ELIMINAR_USUARIO_ID:
`UPDATE usuarios SET estado = 0 WHERE id = ?`,

EDITAR_USUARIO:
`UPDATE usuarios 
SET nombres = IFNULL(?, nombres),
apellidos = IFNULL(?, apellidos),
correo = IFNULL(?, correo),
contrasenia = IFNULL(?, contrasenia),
rol = IFNULL(?, rol)
WHERE id = ?`,

BUSCAR_EMAIL:
`SELECT * FROM usuarios WHERE correo = ?`

};