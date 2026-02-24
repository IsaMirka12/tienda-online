class Usuario {

 constructor(id,nombres,apellidos,correo,contrasenia,rol,estado,fecha_registro){

   this.id=id;
   this.nombres=nombres;
   this.apellidos=apellidos;
   this.correo=correo;
   this.contrasenia=contrasenia;
   this.rol=rol;
   this.estado=estado;
   this.fecha_registro=fecha_registro;

 }

}

module.exports=Usuario;