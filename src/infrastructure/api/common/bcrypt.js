const bcrypt = require('bcryptjs')


const encriptarContrasena = async (password, saltRounds) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;

};

const validarContrasenia = async ( claveSinEncriptar, claveEncriptada)  => {
    const consValida = await bcrypt.compare(claveSinEncriptar, claveEncriptada);
    return consValida;
}

module.exports = {
    encriptarContrasena,
    validarContrasenia
}