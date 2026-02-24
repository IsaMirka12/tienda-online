class ProductoController {
    constructor(productoService) {
      this.productoService = productoService;
    }
  
    async obtenerProductoPorId(req, res) {
      const { id } = req.params;
      try {
        const producto = await this.productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(producto);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async obtenerTodosLosProductos(req, res) {
      try {
        const productos = await this.productoService.obtenerTodosLosProductos();
        if (!productos) return res.status(404).json({ message: 'no hay productos' });
        res.json(productos);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async agregarProducto(req, res) {
      const productoData = req.body;
      try {
          const productoCreado = await this.productoService.agregarProducto(productoData);
          res.status(201).json({ status: true,message: 'Producto creado exitosamente', data: productoCreado });
      } catch (error) {
          res.status(500).json({status: false, message: error.message });
      }
    }

  
    async eliminarProductoPorId(req, res) {
      const { id }  = req.params;
      try {        
        const menssaje = await this.productoService.eliminarProductoPorId(id);
        if (menssaje.status) {
          return res.status(200).json(menssaje);
        }
        return res.status(404).json(menssaje);
        
      } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
      }

    }

    //encargado de agregar el cuerpo 
    async editarProducto(req, res) {
      const { id } = req.params;
      const { nombre, descripcion, precio, imagen, categoria_id, estado } = req.body;
      try {
        const actualizado = await this.productoService.editarProducto(id, {
          nombre,
          descripcion,
          precio,
          imagen,
          categoria_id,
          estado,
        });
        if (!actualizado) {
          return res.status(404).json({status:false, message: 'Producto no encontrado' });
        }
        res.json({ status: true, message: 'Producto actualizado exitosamente' });
      } catch (error) {
        res.status(500).json({status: false, message: error.message });
      }
    }
  
  }
  
  module.exports = ProductoController;
  