// src/domain/usecases/consultarUsuarioPorNombre.usecase.js
export class ConsultarUsuarioPorNombreUseCase {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(nombreUsuario) {
    return this.usuarioRepository.buscarPorNombre(nombreUsuario);
  }
}