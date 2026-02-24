const express = require('express');
const UsuarioMySQLRepository = require('../../database/UsuarioMySQLRepository');
const UsuarioService = require('../../../application/services/UsuarioService');
const UsuarioController = require('../controllers/UsuarioController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

const usuarioRepository = new UsuarioMySQLRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);

router.get('/todos',authMiddleware, (req, res) => usuarioController.obtenerTodosLosUsuarios(req, res));
router.get('/obtener/:id', authMiddleware, (req, res) => usuarioController.obtenerUsuarioId(req, res));
router.post('/agregar', (req, res) => usuarioController.agregarUsuario(req, res));
router.delete('/eliminar/:id', authMiddleware, (req, res) => usuarioController.eliminarUsuarioId(req, res));
router.put('/editar/:id',authMiddleware, (req, res)=> usuarioController.editarUsuario(req, res)); 
router.post('/email',authMiddleware, (req, res) => usuarioController.buscarPorEmail(req, res));
router.post('/login', (req, res) => usuarioController.login(req, res));


module.exports = router;
