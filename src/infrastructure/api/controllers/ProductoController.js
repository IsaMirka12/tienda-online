class ProductoController {
    constructor(productoService) {
      this.productoService = productoService;
    }
  
    async obtenerProductoPorId(req, res) {
      const { id } = req.params;
      try {
        const producto = await this.productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
  
        // Aquí la entidad se convierte a un objeto JSON para enviarla como respuesta
        res.json(producto);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async obtenerTodosLosProductos(req, res) {
      try {
        const productos = await this.productoService.obtenerTodosLosProductos();
        if (!productos) return res.status(404).json({ message: 'no hay productos' });
  
        // Aquí la entidad se convierte a un objeto JSON para enviarla como respuesta
        res.json(productos);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
  
  module.exports = ProductoController;
  