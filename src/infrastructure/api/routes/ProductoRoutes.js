const express = require('express');
const ProductoMySQLRepository = require('../../database/ProductoMySQLRepository');
const ProductoService = require('../../../application/services/ProductoService');
const ProductoController = require('../controllers/ProductoController');

const router = express.Router();

const productoRepository = new ProductoMySQLRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);

router.get('/todos', (req, res) => productoController.obtenerTodosLosProductos(req, res));
router.get('/:id', (req, res) => productoController.obtenerProductoPorId(req, res));


module.exports = router;
