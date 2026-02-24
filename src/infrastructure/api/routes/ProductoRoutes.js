const express = require('express');
const ProductoMySQLRepository = require('../../database/ProductoMySQLRepository');
const ProductoService = require('../../../application/services/ProductoService');
const ProductoController = require('../controllers/ProductoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

const productoRepository = new ProductoMySQLRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);

/**
 * @swagger
 * tags:
 *   name: Producto
 *   description: Endpoints de productos
 */

/**
 * @swagger
 * /producto/todos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/todos', (req, res) => productoController.obtenerTodosLosProductos(req, res));

/**
 * @swagger
 * /producto/obtener/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/obtener/:id', authMiddleware, (req, res) => productoController.obtenerProductoPorId(req, res));

/**
 * @swagger
 * /producto/agregar:
 *   post:
 *     summary: Agrega un nuevo producto
 *     tags: [Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/agregar', authMiddleware, (req, res) => productoController.agregarProducto(req, res));

/**
 * @swagger
 * /producto/eliminar/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/eliminar/:id', authMiddleware, (req, res) => productoController.eliminarProductoPorId(req, res));

/**
 * @swagger
 * /producto/editar/{id}:
 *   put:
 *     summary: Edita un producto por ID
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put('/editar/:id', authMiddleware, (req, res) => productoController.editarProducto(req, res));

module.exports = router;