const Categoria = require("../../domain/entities/Categoria");
const { categoriaSchema, categoriaUpdateSchema } = require("../../domain/validaciones/categoriaValidaciones");

class CategoriaService {
    constructor(categoriaRepository) {
      this.categoriaRepository = categoriaRepository;
    }
  
    async obtenerCategoriaPorId(id) {
      return this.categoriaRepository.obtenerCategoriaPorId(id);
    }
    async obtenerTodasLasCategorias() {
      return this.categoriaRepository.obtenerTodasLasCategorias();
    }

    async agregarCategoria(categoriaData) {
      const { error } = categoriaSchema.validate(categoriaData, { abortEarly: false });

      if (error) {
          throw new Error(`Error de validación: ${error.details.map(err => err.message).join(", ")}`);
      }
      const categoria = new Categoria(
          null, 
          categoriaData.nombre,
          categoriaData.descripcion
      );

      return await this.categoriaRepository.insertarCategoria(categoria);
  }
  async eliminarCategoriaPorId(id) {
    return this.categoriaRepository.eliminarCategoriaPorId(id);
    
  }

  async editarCategoria(id, datosCategoria) {
    const { error } = categoriaUpdateSchema.validate(datosCategoria, { abortEarly: false });

    if (error) {
        throw new Error(`Error de validación: ${error.details.map(err => err.message).join(", ")}`);
    }
    return this.categoriaRepository.editarCategoria(id, datosCategoria);
  }

  }
  
  module.exports = CategoriaService;
  