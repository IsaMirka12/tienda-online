class ExampleService {
    constructor(exampleRepository) {
      this.exampleRepository = exampleRepository;
    }
  
    async getExampleById(id) {
      return this.exampleRepository.findById(id);
    }
  }
  
  module.exports = ExampleService;
  