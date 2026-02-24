const Usuario=require("../../domain/entities/usuario");
const {usuarioSchema,usuarioUpdateSchema}=require("../../domain/validaciones/usuarioValidaciones");

class UsuarioService{

 constructor(repo){
   this.usuarioRepository=repo;
 }

 obtenerUsuarioId(id){
   return this.usuarioRepository.obtenerUsuarioId(id);
 }

 obtenerTodosLosUsuarios(){
   return this.usuarioRepository.obtenerTodosLosUsuarios();
 }

 async agregarUsuario(data){

   const {error}=usuarioSchema.validate(data,{abortEarly:false});
   if(error) throw new Error(error.details.map(e=>e.message).join(","));

   const usuario=new Usuario(
     null,
     data.nombres,
     data.apellidos,
     data.correo,
     data.contrasenia,
     data.rol,
     1,
     null
   );

   return this.usuarioRepository.agregarUsuario(usuario);

 }

 eliminarUsuarioId(id){
   return this.usuarioRepository.eliminarUsuarioId(id);
 }

 async editarUsuario(id,data){

   const {error}=usuarioUpdateSchema.validate(data);
   if(error) throw new Error(error.message);

   return this.usuarioRepository.editarUsuario(id,data);

 }

 async buscarPorEmail(correo){

   const u=await this.usuarioRepository.buscarPorEmail(correo);
   if(!u) throw new Error("Usuario no encontrado");

   return u;

 }

 async login(correo,password){

   const u=await this.usuarioRepository.login(correo,password);
   if(!u) throw new Error("Credenciales incorrectas");

   return u;

 }

}

module.exports=UsuarioService;