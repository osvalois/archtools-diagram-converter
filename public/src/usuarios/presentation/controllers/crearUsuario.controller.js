// src/presentation/controllers/CrearUsuarioController.js
export class CrearUsuarioController {
    constructor(store, usuarioService) {
        this.store = store;
        this.usuarioService = usuarioService;
    }

    async handleInput(nombreUsuario) {
        this.store.setState({ nombreUsuario });

        try {
            const usuario = await this.usuarioService.consultarUsuarioPorNombre(nombreUsuario);
            if (usuario) {
                this.store.setState({ errors: { crearUsuario: 'El nombre de usuario ya existe.' } });
            } else {
                this.store.setState({ errors: { crearUsuario: '' } });
            }
        } catch (error) {
            console.error('Error al consultar usuario:', error);
        }
    }

    async handleSubmit(nombreUsuario) {
        this.store.setState({ isSubmitting: true });
        const encrypted = CryptoJS.AES.encrypt(nombreUsuario, "myPassword").toString();

        try {
            const usuario = await this.usuarioService.crearUsuario(nombreUsuario, encrypted);
            console.log('Usuario creado:', usuario);
            return { success: true, message: 'Usuario creado correctamente' };
        } catch (error) {
            console.error('Error al crear usuario:', error);
            return { success: false, message: 'Error al crear usuario' };
        } finally {
            this.store.setState({ isSubmitting: false });
        }
    }
}