class AutorService {
    constructor(autorRepository) {
      this.autorRepository = autorRepository;
    }
  
    async obtenerAutorPorId(id) {
      return this.autorRepository.obtenerAutorPorId(id);
    }
    async obtenerTodosLosAutores() {
      return this.autorRepository.obtenerTodosLosAutores();
    }
  }
  
  module.exports = AutorService;
  