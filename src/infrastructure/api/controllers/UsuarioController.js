const { generarToken } = require('../middlewares/authMiddleware');

class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  async obtenerUsuarioId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await this.usuarioService.obtenerUsuarioId(id);
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }

  async obtenerTodosLosUsuarios(req, res) {
    try {
      const usuarios = await this.usuarioService.obtenerTodosLosUsuarios();
      if (!usuarios || usuarios.length === 0) return res.status(404).json({ message: 'No hay usuarios' });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async agregarUsuario(req, res) {
    const usuarioData = req.body;
    try {
      const usuarioCreado = await this.usuarioService.agregarUsuario(usuarioData);
      res.status(201).json({
        status: true,
        message: 'Usuario creado exitosamente',
        data: usuarioCreado
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  }

  async eliminarUsuarioId(req, res) {
    const { id } = req.params;
    try {        
      const mensaje = await this.usuarioService.eliminarUsuarioId(id);
      if (mensaje.status) return res.status(200).json(mensaje);
      return res.status(404).json(mensaje);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async editarUsuario(req, res) {
    const { id } = req.params;
    const { nombres, apellidos, correo, contrasenia, rol, estado } = req.body;

    try {
      const actualizado = await this.usuarioService.editarUsuario(id, {
        nombres,
        apellidos,
        correo,
        contrasenia,
        rol,
        estado
      });
      if (!actualizado) return res.status(404).json({ status: false, message: 'Usuario no encontrado' });

      res.json({ status: true, message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  }

  async buscarPorEmail(req, res) {
    try {
      const { correo } = req.body;
      const usuario = await this.usuarioService.buscarPorEmail(correo);
      res.status(200).json({
        message: 'Correo encontrado',
        usuario
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { correo, contrasenia } = req.body;

    try {
      const usuario = await this.usuarioService.login(correo, contrasenia);
      const tokenGenerado = generarToken(usuario);
      res.status(200).json({
        message: 'Login exitoso',
        token: tokenGenerado
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UsuarioController;