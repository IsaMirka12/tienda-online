class ImagenController {
    constructor(imagenService) {
      this.imagenService = imagenService;
    }
  
    async obtenerImagenPorId(req, res) {
      const { id } = req.params;
      try {
        const imagen = await this.imagenService.obtenerImagenPorId(id);
        if (!imagen) return res.status(404).json({ message: 'Imagen no encontrado' });
  
        // Aquí la entidad se convierte a un objeto JSON para enviarla como respuesta
        res.json(imagen);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async obtenerTodasLasImagenes(req, res) {
      try {
        const imagenes = await this.imagenService.obtenerTodasLasImagenes();
        if (!imagenes) return res.status(404).json({ message: 'no hay imagenes' });
  
        // Aquí la entidad se convierte a un objeto JSON para enviarla como respuesta
        res.json(imagenes);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async agregarImagen(req, res) {
      const imagenData = req.body;
      try {
          const imagenCreado = await this.imagenService.agregarImagen(imagenData);
          res.status(201).json({ status: true,message: 'Imagen creado exitosamente', data: imagenCreado });
      } catch (error) {
          res.status(500).json({status: false, message: error.message });
      }
    }

  
    async eliminarImagenPorId(req, res) {
      const { id }  = req.params;
      try {        
        const menssaje = await this.imagenService.eliminarImagenPorId(id);
        if (menssaje.status) {
          return res.status(200).json(menssaje);
        }
        return res.status(404).json(menssaje);
        
      } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
      }

    }

    //encargado de agregar el cuerpo 
    async editarImagen(req, res) {
      const { id } = req.params;
      const { productoId, url, esPrincipal, estado  } = req.body;
      try {
        const actualizado = await this.imagenService.editarImagen(id, {
          productoId,
          url,
          esPrincipal,
          estado,
        });
        if (!actualizado) {
          return res.status(404).json({status:false, message: 'Imagen no encontrado' });
        }
        res.json({ status: true, message: 'Imagen actualizada exitosamente' });
      } catch (error) {
        res.status(500).json({status: false, message: error.message });
      }
    }
  
  }
  
  module.exports = ImagenController;
  