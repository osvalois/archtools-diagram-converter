// obtenerUsuarioPorId.usecase.js

function ObtenerUsuarioPorIdUseCase(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  
  ObtenerUsuarioPorIdUseCase.prototype.execute = async function(usuarioId) {
    try {
      // Obtener usuario por ID usando el repositorio
      const usuario = await this.usuarioRepository.obtenerUsuarioPorId(usuarioId);
  
      return usuario;
    } catch (error) {
      console.error(`Error al ejecutar el caso de uso ObtenerUsuarioPorId para el usuario ${usuarioId}:`, error);
      throw error;
    }
  };
  
  module.exports = ObtenerUsuarioPorIdUseCase;
  