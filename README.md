#API Tienda Online

API REST desarrollada en Node.js para la gestión de una tienda online.
Permite administrar usuarios, productos, categorías, pedidos e imágenes, incluyendo autenticación mediante JWT y documentación con Swagger.

Descripción

La API expone endpoints para operaciones CRUD sobre las entidades principales del sistema.
Incluye manejo de autenticación, validación de credenciales, encriptación de contraseñas y persistencia en base de datos MySQL.

El sistema permite:

registrar usuarios

iniciar sesión

administrar productos

gestionar categorías

crear y consultar pedidos con sus detalles

asociar imágenes a productos

consultar información mediante endpoints protegidos con token

Tecnologías utilizadas

Node.js

Express

MySQL

JSON Web Token (JWT) para autenticación

bcrypt para cifrado de contraseñas

Swagger / OpenAPI para documentación de la API

dotenv para variables de entorno

CORS para control de acceso

Autenticación

La API utiliza autenticación basada en JWT.
Los endpoints protegidos requieren enviar el token en el header:

Authorization: Bearer TOKEN

Documentación

La documentación interactiva de la API está disponible mediante Swagger UI y permite probar los endpoints, visualizar los modelos de datos y enviar solicitudes autenticadas.

Funcionalidad general

La API implementa:

creación, consulta, edición y eliminación de usuarios

registro de nuevos productos con precio, descripción, imagen y categoría

administración de categorías

creación de pedidos con múltiples productos

almacenamiento de detalles del pedido

validación de credenciales en login

protección de rutas mediante middleware de autenticación