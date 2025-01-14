class ExampleController {
    constructor(exampleService) {
      this.exampleService = exampleService;
    }
  
    async getExample(req, res) {
      const { id } = req.params;
      try {
        const example = await this.exampleService.getExampleById(id);
        if (!example) return res.status(404).json({ message: 'Example not found' });
  
        // Aquí la entidad se convierte a un objeto JSON para enviarla como respuesta
        res.json({ id: example.id, name: example.name });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
  
  module.exports = ExampleController;
  