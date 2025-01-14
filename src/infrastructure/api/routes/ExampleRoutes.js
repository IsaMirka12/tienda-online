const express = require('express');
const ExampleMySQLRepository = require('../../database/ExampleMySQLRepository');
const ExampleService = require('../../../application/services/ExampleService');
const ExampleController = require('../controllers/ExampleController');

const router = express.Router();

const exampleRepository = new ExampleMySQLRepository();
const exampleService = new ExampleService(exampleRepository);
const exampleController = new ExampleController(exampleService);

router.get('/:id', (req, res) => exampleController.getExample(req, res));

module.exports = router;
