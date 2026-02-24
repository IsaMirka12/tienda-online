const UsuarioRepository=require('../../domain/repositories/UsuarioRepository');
const Usuario=require('../../domain/entities/usuario');
const pool=require('./MySQLConnection');
const queries=require('./queries/UsuarioQueries');
const {encriptarContrasena,validarContrasenia}=require('../api/common/bcrypt');

class UsuarioMySQLRepository extends UsuarioRepository{

async obtenerUsuarioId(id){

 const [r]=await pool.query(queries.OBTENER_USUARIO_ID,[id]);
 if(!r.length) return null;
 const u=r[0];

 return new Usuario(
   u.id,u.nombres,u.apellidos,u.correo,
   u.contrasenia,u.rol,u.estado,u.fecha_registro
 );
}

async obtenerTodosLosUsuarios(){

 const [rows]=await pool.query(queries.OBTENER_TODOS_USUARIO);

 return rows.map(u=>new Usuario(
   u.id,u.nombres,u.apellidos,u.correo,
   u.contrasenia,u.rol,u.estado,u.fecha_registro
 ));

}

async agregarUsuario(usuario){

 const hash=await encriptarContrasena(usuario.contrasenia,10);

 const [res]=await pool.query(
   queries.INSERTAR_USUARIO,
   [usuario.nombres,usuario.apellidos,usuario.correo,hash,usuario.rol]
 );

 usuario.id=res.insertId;
 usuario.contrasenia=hash;

 return usuario;
}

async eliminarUsuarioId(id){

 const [r]=await pool.query(queries.ELIMINAR_USUARIO_ID,[id]);

 if(!r.affectedRows) return {status:false,message:"Usuario no encontrado"};

 return {status:true,message:"Usuario eliminado"};
}

async editarUsuario(id,d){

 let pass=null;
 if(d.contrasenia) pass=await encriptarContrasena(d.contrasenia,10);

 await pool.query(queries.EDITAR_USUARIO,[
   d.nombres||null,
   d.apellidos||null,
   d.correo||null,
   pass,
   d.rol||null,
   id
 ]);

 return true;
}

async buscarPorEmail(correo){

 const [r]=await pool.query(queries.BUSCAR_EMAIL,[correo]);
 return r[0]||null;

}

async login(correo,password){

 const u=await this.buscarPorEmail(correo);
 if(!u) throw new Error("Usuario no existe");

 const ok=await validarContrasenia(password,u.contrasenia);
 if(!ok) throw new Error("Password incorrecto");

 return u;
}

}

module.exports=UsuarioMySQLRepository;