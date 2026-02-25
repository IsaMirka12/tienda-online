const express = require('express');
const ProductoMySQLRepository = require('../../database/ProductoMySQLRepository');
const ProductoService = require('../../../application/services/ProductoService');
const ProductoController = require('../controllers/ProductoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

const productoRepository = new ProductoMySQLRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);


router.get('/todos', (req, res) => productoController.obtenerTodosLosProductos(req, res));
router.get('/obtener/:id', authMiddleware, (req, res) => productoController.obtenerProductoPorId(req, res));
router.post('/agregar', authMiddleware, (req, res) => productoController.agregarProducto(req, res));
router.delete('/eliminar/:id', authMiddleware, (req, res) => productoController.eliminarProductoPorId(req, res));
router.put('/editar/:id', authMiddleware, (req, res) => productoController.editarProducto(req, res));

module.exports = router;