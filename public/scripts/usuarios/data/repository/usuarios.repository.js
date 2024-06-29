class UsuariosRepository {
    constructor(datasource) {
      this.datasource = datasource;
    }
  
    // Método para crear usuario
    async crearUsuario(nombreUsuario, passphrase, recoveryKey) {
      return await this.datasource.crearUsuario(nombreUsuario, passphrase, recoveryKey);
    }
  }
  
  export default UsuariosRepository;
  