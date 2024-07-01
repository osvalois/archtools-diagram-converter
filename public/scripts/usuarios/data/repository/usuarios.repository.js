// usuarios.repository.js

class UsuariosRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }

  async crearUsuario(nombreUsuario, recoveryKey) {
    return await this.datasource.crearUsuario(nombreUsuario, recoveryKey);
  }

  async consultarUsuarioPorNombre(nombreUsuario) {
    return await this.datasource.consultarUsuarioPorNombre(nombreUsuario);
  }
}

export default UsuariosRepository;
