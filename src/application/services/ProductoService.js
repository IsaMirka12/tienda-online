class ProductoService {
    constructor(productoRepository) {
      this.productoRepository = productoRepository;
    }
  
    async obtenerProductoPorId(id) {
      return this.productoRepository.obtenerProductoPorId(id);
    }
    async obtenerTodosLosProductos() {
      return this.productoRepository.obtenerTodosLosProductos();
    }
  }
  
  module.exports = ProductoService;
  