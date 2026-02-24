require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas
const productoRoutes = require('./api/routes/ProductoRoutes');
const categoriaRoutes = require('./api/routes/CategoriaRoutes');
const imagenRoutes = require('./api/routes/ImagenRoutes');
const pedidoRoutes = require('./api/routes/PedidoRoutes');
const usuarioRoutes = require('./api/routes/UsuarioRoutes');

// Importar Swagger
const { swaggerUi, specs } = require('./swagger');

const app = express();

const corsOptions = {
  origin: '*',  
};

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors(corsOptions));
app.use(express.json());

// Tus rutas
app.use('/producto', productoRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/imagen', imagenRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/usuario', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});