
import { Usuario } from '../../domain/entities/usuario.entity.js';
export class CrearUsuarioUseCase {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(nombreUsuario, recoveryKey) {
    const usuario = new Usuario(nombreUsuario, recoveryKey);
    return this.usuarioRepository.crear(usuario);
  }
}