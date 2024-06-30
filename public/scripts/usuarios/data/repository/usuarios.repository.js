class UsuariosRepository {
    constructor(datasource) {
      this.datasource = datasource;
    }
  
    // Método para crear usuario
    async crearUsuario(nombreUsuario, recoveryKey) {
      return await this.datasource.crearUsuario(nombreUsuario, recoveryKey);
    }
  }
  
  export default UsuariosRepository;
  