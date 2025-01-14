//actua como intermediario entre el sistema y la bd se encarda de hacer el CRUD
class ExampleRepository {
    async findById(id) {
      throw new Error('Method not implemented');
    }
    async obtenerTodos() {
        throw new Error('Method not implemented');
    }
  }
  
  module.exports = ExampleRepository;
  