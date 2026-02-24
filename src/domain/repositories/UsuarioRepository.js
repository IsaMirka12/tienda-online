class UsuarioRepository {
    async obtenerUsuarioId(id) {
      throw new Error('Method not implemented');
    }
    async obtenerTodosLosUsuarios() {
        throw new Error('Method not implemented');
    }
    async agregarUsuario(){
      throw new Error('Method not implemented jj');
    }
    async eliminarUsuarioId(id) {
      throw new Error('Method not implemented');
    }
    async editarUsuario(id , datosUsuario) {
      throw new Error('Method not implemented');
    }
    async buscarPorEmail(email){
      throw new Error("Método no implementado");
    }

    async login(email, password){
      throw new Error("El método no se ha implementado");
    }

  }
  
  module.exports = UsuarioRepository;