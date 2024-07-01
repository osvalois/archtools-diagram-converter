// src/infrastructure/repositories/usuarioRepository.js
import { UsuarioRepositoryPort } from '../../domain/ports/usuarioRepository.port.js';

export class UsuarioRepository extends UsuarioRepositoryPort {
  constructor(apiAdapter) {
    super();
    this.apiAdapter = apiAdapter;
  }

  async crear(usuario) {
    return this.apiAdapter.crear(usuario);
  }

  async buscarPorNombre(nombreUsuario) {
    return this.apiAdapter.buscarPorNombre(nombreUsuario);
  }
}