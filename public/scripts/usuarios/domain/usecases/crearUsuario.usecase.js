class CrearUsuarioUseCase {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
  
    async execute(nombreUsuario, recoveryKey) {
      try {
        const usuarioGuardado = await this.usuarioRepository.crearUsuario(nombreUsuario, recoveryKey);
        return usuarioGuardado;
      } catch (error) {
        console.error('Error al ejecutar el caso de uso CrearUsuario:', error);
        throw error;
      }
    }
  }
  
  export default CrearUsuarioUseCase;
  