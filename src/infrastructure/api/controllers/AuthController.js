// class AuthController {
//     constructor(authService) {
//         this.authService = authService;
//     }

    

//     async login(req, res) {
//         try {
//             const { email, password } = req.body;
//             const { usuario, token } = await this.authService.iniciarSesion(email, password);
//             res.status(200).json({ message: "Inicio de sesión exitoso", usuario, token });
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     }
// }

// module.exports = AuthController;