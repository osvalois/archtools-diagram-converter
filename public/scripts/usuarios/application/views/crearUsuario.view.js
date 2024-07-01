// src/main.js
import { Store } from '../../data/datasource/store.datasource.js';
import { UsuarioApiAdapter } from '../../data/datasource/usuarios.datasource.js';
import { UsuarioRepository } from '../../data/repository/usuarios.repository.js';
import { UsuarioService } from '../services/usuario.service.js';
import { CrearUsuarioView } from './formulario-crear-usuario/formularioCrearUsuario.view.js';

const initialState = {
  nombreUsuario: '',
  isSubmitting: false,
  errors: { crearUsuario: '' }
};

const store = new Store(initialState);
const apiAdapter = new UsuarioApiAdapter('http://localhost:4567');
const usuarioRepository = new UsuarioRepository(apiAdapter);
const usuarioService = new UsuarioService(usuarioRepository);

const view = new CrearUsuarioView(store, usuarioService);
document.body.appendChild(view.element);

store.subscribe(() => {
  console.log('Estado actualizado:', store.getState());
});