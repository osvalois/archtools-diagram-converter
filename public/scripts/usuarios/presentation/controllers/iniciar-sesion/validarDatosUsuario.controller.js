// validarDatosUsuario.controller.js

import ConsultarUsuarioPorNombreUseCase from '../../../domain/usecases/consultarUsuarioNombre.usecase.js';
import UsuariosRepository from '../../../data/repository/usuarios.repository.js';
import UsuariosDatasource from '../../../data/datasource/usuarios.datasource.js';

const baseUrl = 'http://localhost:4567'; // Reemplaza con la URL de tu API
const datasource = new UsuariosDatasource(baseUrl);
const usuarioRepository = new UsuariosRepository(datasource);
const consultarUsuarioPorNombreUseCase = new ConsultarUsuarioPorNombreUseCase(usuarioRepository);

const ValidarDatosUsuarioController = {
  async consultarUsuarioPorNombre(nombreUsuario) {
    try {
      const usuario = await consultarUsuarioPorNombreUseCase.execute(nombreUsuario);
      return usuario;
    } catch (error) {
      console.error('Error al consultar usuario:', error);
      throw error;
    }
  }
};

export default ValidarDatosUsuarioController;
