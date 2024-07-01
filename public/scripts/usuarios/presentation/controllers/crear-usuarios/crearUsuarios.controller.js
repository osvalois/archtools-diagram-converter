import CrearUsuarioUseCase from '../../../domain/usecases/crearUsuario.usecase.js';
import UsuariosRepository from '../../../data/repository/usuarios.repository.js';
import UsuariosDatasource from '../../../data/datasource/usuarios.datasource.js';
import { setState } from './crearUsuario.state.js';

// URL base del servidor API
const baseUrl = 'http://localhost:4567'; // Reemplazar con la URL de tu API

const datasource = new UsuariosDatasource(baseUrl);
const usuarioRepository = new UsuariosRepository(datasource);
const crearUsuarioUseCase = new CrearUsuarioUseCase(usuarioRepository);

const CrearUsuariosController = {
  async crearUsuario({ nombreUsuario, recoveryKey }) {
    try {
      setState.isSubmitting = true;
      const usuarioGuardado = await crearUsuarioUseCase.execute(nombreUsuario, recoveryKey);
      return usuarioGuardado;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    } finally {
      setState.isSubmitting = false;
    }
  },

};

export default CrearUsuariosController;
