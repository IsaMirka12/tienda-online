const express = require('express');
const PedidoMySQLRepository = require('../../database/PedidoMySQLRepository');
const PedidoService = require('../../../application/services/PedidoService');
const PedidoController = require('../controllers/PedidoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

const pedidoRepository = new PedidoMySQLRepository();
const pedidoService = new PedidoService(pedidoRepository);
const pedidoController = new PedidoController(pedidoService);


router.get('/todos',authMiddleware, (req, res) => pedidoController.obtenerTodosLosPedidos(req, res));
router.get('/obtener/:id',authMiddleware, (req, res) => pedidoController.obtenerPedidoPorId(req, res));
router.post('/agregar',authMiddleware, (req, res) => pedidoController.agregarPedido(req, res));
router.delete('/eliminar/:id', authMiddleware,(req, res) => pedidoController.eliminarPedidoPorId(req, res));
router.put('/editar/:id', authMiddleware,(req, res)=> pedidoController.editarPedido(req, res)); 

module.exports = router;
