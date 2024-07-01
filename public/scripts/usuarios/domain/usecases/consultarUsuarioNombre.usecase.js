// consultarUsuarioNombre.usecase.js
class ConsultarUsuarioPorNombreUseCase {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(nombreUsuario) {
    try {
      const usuario = await this.usuarioRepository.consultarUsuarioPorNombre(nombreUsuario);
      return usuario;
    } catch (error) {
      console.error('Error al ejecutar el caso de uso ConsultarUsuarioPorNombre:', error);
      throw error;
    }
  }
}

export default ConsultarUsuarioPorNombreUseCase;
