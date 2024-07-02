// src/presentation/views/CrearUsuarioView.js
import { FormularioCrearUsuarioComponent } from '../../components/usuarios/formularioCrearUsuario.component.js';
import CardInformacionRegistro from '../../components/usuarios/cardInformacionRegistro.component.js';
import LogoComponent from '../../../../core/presentation/components/general/logo.component.js';
import { CrearUsuarioController } from '../../controllers/crearUsuario.controller.js';

export class FormularioCrearUsuarioView {
  constructor(store, usuarioService) {
    this.controller = new CrearUsuarioController(store, usuarioService);
    this.element = document.createElement('div');
    this.render();
    this.setupStateSubscription();
  }

  render() {
    const cardTitle = "¿Qué es Pingendata?";
    const cardDescription = `Simplifica la gestión de proyectos de bases de datos al centralizar la documentación completa y facilitar la colaboración entre equipos. Permite desde crear modelos de datos hasta políticas de optimización, asegurando que aspectos cruciales.`;
    const formulario = new FormularioCrearUsuarioComponent(this.controller);
    const logoComponent = new LogoComponent({ text1: 'Pingen', text2: 'Data', gradient1: 'from-purple-500 to-indigo-500', gradient2: 'indigo-500' });

    this.element.innerHTML = `
      <div class="container h-full p-10">
        <div class="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div class="w-full">
            <div class="block rounded-lg bg-white shadow-lg bg-gradient-to-br from-violet-100 to-gray-200 bg-opacity-90 text-gray-900">
              <div class="g-0 lg:flex lg:flex-wrap">
                <div class="px-4 md:px-0 lg:w-6/12">
                  <div class="md:mx-6 md:p-12">
                    <div class="text-center">
                      <div id="logo-component"></div>
                      <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Documentación eficiente, proyectos fluidos.
                      </h4>
                    </div>
                    <div id="formulario-container"></div>
                    <div class="flex items-center justify-between pb-6">
                        <p class="mb-0 mr-2 text-gray-500">¿Ya tienes una cuenta?</p>
                        <button
                            type="button"
                            class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-twe-ripple-init
                            data-twe-ripple-color="light">
                            Iniciar Sesión
                        </button>
                    </div>
                  </div>
                </div>
                ${CardInformacionRegistro({ title: cardTitle, description: cardDescription })}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.element.querySelector('#formulario-container').appendChild(formulario.element);
    this.element.querySelector('#logo-component').appendChild(logoComponent.element);
  }

  setupStateSubscription() {
    this.controller.store.subscribe(() => {
      this.updateView();
    });
  }

  updateView() {
    const state = this.controller.store.getState();

    // Update error messages
    const errorElement = this.element.querySelector('.text-red-500');
    if (errorElement) {
      errorElement.textContent = state.errors.crearUsuario || '';
    }

    // Update input border color based on validation state
    const inputElement = this.element.querySelector('#nombreUsuario');
    if (inputElement) {
      inputElement.classList.remove('border-red-500', 'border-green-500');
      if (state.errors.crearUsuario) {
        inputElement.classList.add('border-red-500');
      } else if (state.nombreUsuario) {
        inputElement.classList.add('border-green-500');
      }
    }

    // Disable/Enable submit button based on form validity
    const submitButton = this.element.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = state.isSubmitting || !!state.errors.crearUsuario;
      submitButton.classList.toggle('opacity-50', submitButton.disabled);
    }
  }
}