const express = require('express');
const CategoriaMySQLRepository = require('../../database/CategoriaMySQLRepository');
const CategoriaService = require('../../../application/services/CategoriaService');
const CategoriaController = require('../controllers/CategoriaController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

const categoriaRepository = new CategoriaMySQLRepository();
const categoriaService = new CategoriaService(categoriaRepository);
const categoriaController = new CategoriaController(categoriaService);

router.get('/todos',authMiddleware, (req, res) => categoriaController.obtenerTodasLasCategorias(req, res));
router.get('/buscar/:id',authMiddleware, (req, res) => categoriaController.obtenerCategoriaPorId(req, res));
router.post('/agregar',authMiddleware, (req, res) => categoriaController.agregarCategoria(req, res));
router.delete('/eliminar/:id',authMiddleware, (req, res) => categoriaController.eliminarCategoriaPorId (req, res));
router.put('/editar/:id',authMiddleware, (req, res)=> categoriaController.editarCategoria(req, res)); 


module.exports = router;
