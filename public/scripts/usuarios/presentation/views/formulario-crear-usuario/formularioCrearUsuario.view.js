import UsuariosController from '../../controllers/crear-usuarios/crearUsuarios.controller.js';
import LogoComponent from '../../../../core/presentation/components/general/logo.component.js';
import IconInputTextComponent from '../../../../core/presentation/components/inputs/icon/iconInputText.component.js';
import FormButtonComponent from '../../../../core/presentation/components/buttons/formButton.component.js';
import { setState, getState } from '../../controllers/crear-usuarios/crearUsuario.state.js';
import CardInformacionRegistro from '../../components/usuarios/cardInformacionRegistro.component.js';

function FormularioCrearUsuarioView() {
  const state = getState();



  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Generar recoveryKey basado en el nombre de usuario
      var encrypted = CryptoJS.AES.encrypt(state.nombreUsuario, "myPassword");
      var decrypted = CryptoJS.AES.decrypt(encrypted, "myPassword");
      console.log("encrypted")
      console.log(encrypted)
      const usuario = await UsuariosController.crearUsuario({
        nombreUsuario: state.nombreUsuario,
        recoveryKey: encrypted
      });

      console.log('Usuario creado:', usuario);
      alert('Usuario creado correctamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario');
    }
  };
  const render = () => {
    // Datos específicos para Pingendata
    const cardTitle = "¿Qué es Pingendata?";
    const cardDescription = `
    Simplifica la gestión de proyectos de bases de datos al centralizar la documentación completa y facilitar la colaboración entre equipos. Permite desde crear modelos de datos hasta políticas de optimización, asegurando que aspectos cruciales.
    `;
    const HTML = `
      <div class="container h-full p-10">
        <div class="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div class="w-full">
            <div class="block rounded-lg bg-white shadow-lg bg-gradient-to-br from-violet-100 to-gray-200 bg-opacity-90 text-gray-900">
              <div class="g-0 lg:flex lg:flex-wrap">
                <div class="px-4 md:px-0 lg:w-6/12">
                  <div class="md:mx-6 md:p-12">
                    <div class="text-center">
                      ${LogoComponent({ text1: 'Pingen', text2: 'Data', gradient1: 'from-purple-500 to-indigo-500', gradient2: 'indigo-500' })}
                      <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Documentación eficiente, proyectos fluidos.
                      </h4>
                    </div>
                    <form id="crearUsuarioForm">
                      <p class="mb-3">Please register an account</p>
                      <div class="relative mb-2" data-twe-input-wrapper-init>
                        ${IconInputTextComponent({
                          value: state.nombreUsuario,
                          placeholder: 'Username',
                          identifier: 'nombreUsuario',
                          className: 'mb-2'
                        })}
                        <div class="text-red-500 text-xs mt-1">${state.errors.nombreUsuario}</div>
                      </div>
                      <div class="mb-4 pb-1 pt-1 text-center">
                        ${FormButtonComponent({
                          text: 'Crear Usuario',
                          isSubmitting: state.isSubmitting,
                          onClick: handleFormSubmit,
                          className: 'mt-4',
                          type: 'submit',
                          ariaLabel: 'Crear Usuario Button'
                        })}
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
                  </div>
                </div>
                ${CardInformacionRegistro({ title: cardTitle, description: cardDescription })}
              </div>
            </div>
          </div>
        </div>
      </div>`;

    const container = document.createElement('div');
    container.innerHTML = HTML;

    const formElement = container.querySelector('#crearUsuarioForm');
    if (formElement) {
      formElement.addEventListener('submit', handleFormSubmit);
      container.querySelector('#nombreUsuario').addEventListener('input', (e) => setState.nombreUsuario = e.target.value);
    }

    return container;
  };

  return render();
}

export default FormularioCrearUsuarioView;
