
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "tienda online",
      version: "1.0.0",
      description: "API de productos, categorías, imágenes, pedidos y usuarios",
    },
    servers: [
      {
        url: "http://localhost:3000", 
      },
    ],
  },
    apis: [path.join(__dirname, "api/routes/*.js")],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };