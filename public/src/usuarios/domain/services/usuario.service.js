// src/application/services/usuarioService.js
import { CrearUsuarioUseCase } from '../../domain/usecases/crearUsuario.usecase.js';
import { ConsultarUsuarioPorNombreUseCase } from '../../domain/usecases/consultarUsuarioNombre.usecase.js';

export class UsuarioService {
  constructor(usuarioRepository) {
    this.crearUsuarioUseCase = new CrearUsuarioUseCase(usuarioRepository);
    this.consultarUsuarioPorNombreUseCase = new ConsultarUsuarioPorNombreUseCase(usuarioRepository);
  }

  async crearUsuario(nombreUsuario, recoveryKey) {
    return this.crearUsuarioUseCase.execute(nombreUsuario, recoveryKey);
  }

  async consultarUsuarioPorNombre(nombreUsuario) {
    return this.consultarUsuarioPorNombreUseCase.execute(nombreUsuario);
  }
}