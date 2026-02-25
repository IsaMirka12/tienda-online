const Imagen = require("../../domain/entities/Imagen");
const { imagenSchema, imagenUpdateSchema } = require("../../domain/validaciones/imagenValidator");

class ImagenService {
    constructor(imagenRepository) {
      this.imagenRepository = imagenRepository;
    } 
    async obtenerImagenPorId(id) {
      return this.imagenRepository.obtenerImagenPorId(id);
    }
    async obtenerTodasLasImagenes() {
      return this.imagenRepository.obtenerTodasLasImagenes();
    }
    async agregarImagen(imagenData) {

      const { error } = imagenSchema.validate(imagenData, { abortEarly: false });

      if (error) {
          throw new Error(`Error de validación: ${error.details.map(err => err.message).join(", ")}`);
      }
      const imagen = new Imagen(
          null, 
          imagenData.productoId,
          imagenData.url,
          imagenData.esPrincipal,
          imagenData.estado
      );
      return await this.imagenRepository.insertarImagen(imagen);
  }
  async eliminarImagenPorId(id) {
    return this.imagenRepository.eliminarImagenPorId(id);
    
  }

  async editarImagen(id, datosImagen) {
    const { error } = imagenUpdateSchema.validate(datosImagen, { abortEarly: false });

    if (error) {
        throw new Error(`Error de validación: ${error.details.map(err => err.message).join(", ")}`);
    }
    return this.imagenRepository.editarImagen(id, datosImagen);
  }
  
  }
  
  module.exports = ImagenService;
  