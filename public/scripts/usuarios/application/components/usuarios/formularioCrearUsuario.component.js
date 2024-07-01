// FormularioCrearUsuario class
import {IconInputTextComponent}  from '../../../../core/application/components/inputs/icon/iconInputText.component.js';
import FormButtonComponent from '../../../../core/application/components/buttons/formButton.component.js';

export class FormularioCrearUsuario {
    constructor(store, usuarioService) {
        this.store = store;
        this.usuarioService = usuarioService;
        this.element = document.createElement('form');
        this.render();
        this.addEventListeners();
    }

    render() {
        const state = this.store.getState();
        const inputUserName = new IconInputTextComponent({
            value: state.nombreUsuario,
            placeholder: 'Username',
            identifier: 'nombreUsuario',
            ariaLabel: state.errors.nombreUsuario,
            inputBorderColor: state.inputBorderColor,
            ariaLabelColor: state.errors.nombreUsuario ? 'text-red-500' : '',
            className: 'mb-2',
            theme: 'light'
        }); 
        const buttonSubmitForm =  new FormButtonComponent({
            text: 'Crear Usuario',
            className: 'mt-4',
            type: 'submit',
            ariaLabel: 'Crear Usuario Button'
        });
        this.element.innerHTML = `
            <form id="crearUsuarioForm">
                <p class="mb-3">Please register an account</p>
                <div class="relative mb-2" data-twe-input-wrapper-init>
                    <div id="input-user-name"></div>
                    <div class="text-red-500 text-xs mt-1">${state.errors.crearUsuario}</div>
                </div>
                <div class="mb-4 pb-1 pt-1 text-center">
                <div id="button-submit-form"></div>
                    <a href="#!">Terms and conditions</a>
                </div>
                <div class="flex items-center justify-between pb-6">
                    <p class="mb-0 me-2">Have an account?</p>
                    <button
                        type="button"
                        class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                        data-twe-ripple-init
                        data-twe-ripple-color="light">
                        Login
                    </button>
                </div>
            </form>
        `;
    
        
        this.element.querySelector('#button-submit-form').appendChild(buttonSubmitForm.element); // Call render() method to get the DOM node
        // Render and append to the DOM
        this.element.querySelector('#input-user-name').appendChild(inputUserName.element); // Call render() method to get the DOM node
    }

    addEventListeners() {
        this.element.addEventListener('submit', this.handleSubmit.bind(this));
        // Ensure the selector is correct and matches the ID of the input
        this.element.querySelector('#nombreUsuario').addEventListener('input', this.handleInput.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const state = this.store.getState();
        this.store.setState({ isSubmitting: true });
        // Generate recoveryKey based on the username
        const encrypted = CryptoJS.AES.encrypt(state.nombreUsuario, "myPassword").toString();
        console.log("encryptedString:", encrypted);

        try {
            const usuario = await this.usuarioService.crearUsuario(state.nombreUsuario, encrypted);
            console.log('Usuario creado:', usuario);
            alert('Usuario creado correctamente');
        } catch (error) {
            console.error('Error al crear usuario:', error);
            alert('Error al crear usuario');
        } finally {
            this.store.setState({ isSubmitting: false });
        }
    }

    async handleInput(event) {
        const nombreUsuario = event.target.value;
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
}
