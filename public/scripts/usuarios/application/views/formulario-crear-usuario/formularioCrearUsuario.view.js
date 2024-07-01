// src/presentation/views/CrearUsuarioView.js
import { FormularioCrearUsuario } from '../../components/usuarios/formularioCrearUsuario.component.js';
import CardInformacionRegistro from '../../components/usuarios/cardInformacionRegistro.component.js';
import LogoComponent from '../../../../core/application/components/general/logo.component.js';

export class CrearUsuarioView {
  constructor(store, usuarioService) {
    this.store = store;
    this.usuarioService = usuarioService;
    this.element = document.createElement('div');
    this.render();
  }

  render() {
    const cardTitle = "¿Qué es Pingendata?";
    const cardDescription = `Simplifica la gestión de proyectos de bases de datos al centralizar la documentación completa y facilitar la colaboración entre equipos. Permite desde crear modelos de datos hasta políticas de optimización, asegurando que aspectos cruciales.`;
    const formulario = new FormularioCrearUsuario(this.store, this.usuarioService);
    this.element.innerHTML = `
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
                    <div id="formulario-container"></div>
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
  }
}