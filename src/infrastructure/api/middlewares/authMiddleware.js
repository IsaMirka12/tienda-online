const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async  (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {

        return res.status(401).json({ message: "Acceso denegado. No hay token" , code: "ERR-01"});
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.usuario = decoded; // Agrega los datos del usuario al request
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Token inválido o expirado", code: "ERR-01" });
    }
};

const generarToken = (usuario) => {
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return token;
};

module.exports = {
    authMiddleware,
    generarToken
};