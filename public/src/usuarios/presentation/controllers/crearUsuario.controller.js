import { CRYPTO_KEY_SEED } from '../../../../configuration/env/keys.dev.js';

export class CrearUsuarioController {
    constructor(store, usuarioService) {
        this.store = store;
        this.usuarioService = usuarioService;
        this.initState();
        this.debounceTimeout = null; // Añadimos una propiedad para almacenar el timeout de debounce
    }

    initState() {
        this.store.setState({
            nombreUsuario: '',
            isSubmitting: false,
            isError: false,
            errors: { crearUsuario: '' },
            userExists: false, // Nuevo estado para indicar si el usuario existe
            loading: false // Nuevo estado para indicar que se está cargando la consulta
        });
    }

    debounce(func, delay) {
        return (...args) => {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async handleInput(nombreUsuario) {
        this.store.setState({ nombreUsuario, loading: true });

        // Validación de longitud mínima
        if (nombreUsuario.length < 5) {
            this.store.setState({
                isError: true,
                errors: { crearUsuario: 'El nombre de usuario debe tener al menos 5 caracteres.' },
                loading: false
            });
            return;
        }

        try {
            const usuario = await this.usuarioService.consultarUsuarioPorNombre(nombreUsuario);

            if (usuario.encontrado) {
                this.store.setState({
                    userExists: true,
                    isError: false,
                    errors: { crearUsuario: 'El nombre de usuario ya existe.' }
                });
            } else {
                this.store.setState({
                    userExists: false,
                    isError: false,
                    errors: { crearUsuario: '' }
                });
            }
        } catch (error) {
            this.store.setState({
                isError: true,
                errors: { crearUsuario: 'Error al consultar usuario: ' + error }
            });
        } finally {
            this.store.setState({ loading: false });
        }
    }

    handleInputDebounced = this.debounce(this.handleInput, 300); // Creamos una versión debounced del método handleInput

    async handleSubmit(nombreUsuario) {
        const state = this.store.getState();

        if (state.userExists) {
            console.log('El nombre de usuario ya existe.');
            return { success: false, message: 'El nombre de usuario ya existe.' };
        }

        this.store.setState({ isSubmitting: true });
        const encrypted = CryptoJS.AES.encrypt(nombreUsuario, CRYPTO_KEY_SEED).toString();

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
