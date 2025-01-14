require('dotenv').config();
const express = require('express');
const exampleRoutes = require('./api/routes/ExampleRoutes');
const autorRoutes = require('./api/routes/AutorRoutes');
const productoRoutes = require('./api/routes/ProductoRoutes');

const app = express();

app.use(express.json());
app.use('/examples', exampleRoutes);
app.use('/autor', autorRoutes);
app.use('/producto', productoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
