const express = require('express');
const ImagenMySQLRepository = require('../../database/ImagenMySQLRepository');
const ImagenService = require('../../../application/services/ImagenService');
const ImagenController = require('../controllers/ImagenController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

const imagenRepository = new ImagenMySQLRepository();
const imagenService = new ImagenService(imagenRepository);
const imagenController = new ImagenController(imagenService);

router.get('/todos',authMiddleware, (req, res) => imagenController.obtenerTodasLasImagenes(req, res));
router.get('/obtener/:id',authMiddleware, (req, res) => imagenController.obtenerImagenPorId(req, res));
router.post('/agregar',authMiddleware, (req, res) => imagenController.agregarImagen(req, res));
router.delete('/eliminar/:id', authMiddleware,(req, res) => imagenController.eliminarImagenPorId(req, res));
router.put('/editar/:id',authMiddleware, (req, res)=> imagenController.editarImagen(req, res)); 

module.exports = router;
