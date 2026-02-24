const Producto = require("../../domain/entities/Producto");
const { productoSchema, productoUpdateSchema } = require("../../domain/validaciones/productoValidaciones");

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
    async agregarProducto(productoData) {

      const { error } = productoSchema.validate(productoData, { abortEarly: false });

      if (error) {
          throw new Error(`Error de validación: ${error.details.map(err => err.message).join(", ")}`);
      }
     
      const producto = new Producto(
          null, 
          productoData.nombre,
          productoData.descripcion,
          productoData.precio,
          productoData.imagen,
          productoData.categoria_id,
          productoData.estado
      );
      return await this.productoRepository.insertarProducto(producto);
  }
  async eliminarProductoPorId(id) {
    return this.productoRepository.eliminarProductoPorId(id);
    
  }

  async editarProducto(id, datosProducto) {

    const { error } = productoUpdateSchema.validate(datosProducto, { abortEarly: false });

    if (error) {
        throw new Error(`Error de validación: ${error.details.map(err => err.message).join(", ")}`);
    }
    return this.productoRepository.editarProducto(id, datosProducto);
  }
  }
  module.exports = ProductoService;
  