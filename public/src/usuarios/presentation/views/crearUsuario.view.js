// src/main.js
import { Store } from '../../data/adapter/store.adapter.js';
import { UsuarioApiAdapter } from '../../data/adapter/usuarios.adapter.js';
import { UsuarioRepository } from '../../infrastructure/repository/usuarios.repository.js';
import { UsuarioService } from '../../domain/services/usuario.service.js';
import { FormularioCrearUsuarioView } from './formulario-crear-usuario/formularioCrearUsuario.view.js';

const initialState = {
  nombreUsuario: '',
  isSubmitting: false,
  isError: false,
  errors: { crearUsuario: '' }
};

const store = new Store(initialState);
const apiAdapter = new UsuarioApiAdapter('http://localhost:4567');
const usuarioRepository = new UsuarioRepository(apiAdapter);
const usuarioService = new UsuarioService(usuarioRepository);

const view = new FormularioCrearUsuarioView(store, usuarioService);
document.body.appendChild(view.element);

store.subscribe(() => {
  console.log('Estado actualizado:', store.getState());
});