class CategoriaController {
    constructor(categoriaService) {
      this.categoriaService = categoriaService;
    }
  
    async obtenerCategoriaPorId(req, res) {
      const { id } = req.params;
      try {
        const categoria = await this.categoriaService.obtenerCategoriaPorId(id);
        if (!categoria) return res.status(404).json({ message: 'categoria no encontrado' });
        res.json(categoria);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async obtenerTodasLasCategorias(req, res) {
      try {
        const categorias = await this.categoriaService.obtenerTodasLasCategorias();
        if (!categorias) return res.status(404).json({ message: 'no hay categorias' });
        res.json(categorias);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    async agregarCategoria(req, res) {
      const categoriaData = req.body;
      try {
          const categoriaCreado = await this.categoriaService.agregarCategoria(categoriaData);
          res.status(201).json({ status: true,message: 'Categoria creado con éxito', data: categoriaCreado });
      } catch (error) {
          res.status(500).json({status: false, message: error.message });
      }
    }

    async eliminarCategoriaPorId(req, res) {
      const { id }  = req.params;
      try {        
        const menssaje = await this.categoriaService.eliminarCategoriaPorId(id);
        if (menssaje.status) {
          return res.status(200).json(menssaje);
        }
        return res.status(404).json(menssaje);
        
      } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
      }

    }

    async editarCategoria(req, res) {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
      try {
        const actualizado = await this.categoriaService.editarCategoria(id, {
          nombre
        });
        if (!actualizado) {
          return res.status(404).json({status:false, message: 'Categoria no encontrado' });
        }
        res.json({ status: true, message: 'Categoría actualizado exitosamente' });
      } catch (error) {
        res.status(500).json({status: false, message: error.message });
      }
    }

  }
  
  module.exports = CategoriaController;
  