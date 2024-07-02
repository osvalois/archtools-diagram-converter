import { IconInputTextComponent } from '../../../../core/presentation/components/inputs/icon/iconInputText.component.js';
import FormButtonComponent from '../../../../core/presentation/components/buttons/formButton.component.js';

export class FormularioCrearUsuarioComponent {
    constructor(controller) {
        this.controller = controller;
        this.element = document.createElement('form');
        this.render();
        this.addEventListeners();
    }

    render() {
        const state = this.controller.store.getState();

        const inputUserName = new IconInputTextComponent({
            value: state.nombreUsuario,
            placeholder: 'Username',
            identifier: 'nombreUsuario',
            ariaLabel: state.errors.crearUsuario,
            inputBorderColor: state.userExists ? 'border-red-500' : '',
            ariaLabelColor: state.userExists ? 'text-red-500' : '',
            className: 'mb-2',
            theme: 'light'
        });

        const buttonSubmitForm = new FormButtonComponent({
            text: 'Crear Usuario',
            className: 'mt-4 w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out',
            type: 'submit',
            ariaLabel: 'Crear Usuario Button'
        });

        this.element.innerHTML = `
            <form id="crearUsuarioForm" class="mt-4">
                <p class="mb-4 text-gray-600">Por favor, registra una cuenta</p>
                <div class="relative mb-1" data-twe-input-wrapper-init>
                    <div id="input-user-name"></div>
                    <div class="text-red-500 text-xs mt-1">${state.errors.crearUsuario}</div>
                </div>
                <div class="mb-1 pb-1 pt-1 text-center">
                    <div id="button-submit-form"></div>
                </div>
            </form>
        `;

        this.element.querySelector('#button-submit-form').appendChild(buttonSubmitForm.element);
        this.element.querySelector('#input-user-name').appendChild(inputUserName.element);
    }

    addEventListeners() {
        this.element.addEventListener('submit', this.handleSubmit.bind(this));
        this.element.querySelector('#nombreUsuario').addEventListener('input', this.handleInput.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const state = this.controller.store.getState();
        const result = await this.controller.handleSubmit(state.nombreUsuario);
        if (result.success) {
            alert(result.message);
            this.element.reset();
        } else {
            alert(result.message);
        }
    }

    async handleInput(event) {
        const nombreUsuario = event.target.value;
        await this.controller.handleInput(nombreUsuario);
        this.updateErrorMessages();
    }

    updateErrorMessages() {
        const state = this.controller.store.getState();
        const errorElement = this.element.querySelector('.text-red-500');
        if (errorElement) {
            errorElement.textContent = state.errors.crearUsuario || '';
        }
    }
}
