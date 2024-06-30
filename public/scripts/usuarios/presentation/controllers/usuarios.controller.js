import CrearUsuarioUseCase from '../../domain/usecases/crearUsuario.usecase.js';
import UsuariosRepository from '../../data/repository/usuarios.repository.js';
import UsuariosDatasource from '../../data/datasource/usuarios.datasource.js';

// URL base del servidor API
const baseUrl = 'http://localhost:4567'; // Reemplazar con la URL de tu API

const datasource = new UsuariosDatasource(baseUrl);
const usuarioRepository = new UsuariosRepository(datasource);
const crearUsuarioUseCase = new CrearUsuarioUseCase(usuarioRepository);

const UsuariosController = {
  async crearUsuario({ nombreUsuario, recoveryKey }) {
    try {
      const usuarioGuardado = await crearUsuarioUseCase.execute(nombreUsuario, recoveryKey);
      return usuarioGuardado;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  async obtenerUsuarioPorId(req, res) {
    const usuarioId = req.params.usuario_id;

    try {
      // Aquí se incluiría también ObtenerUsuarioPorIdUseCase si se necesita
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${usuarioId}:`, error);
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  }
};

export default UsuariosController;
