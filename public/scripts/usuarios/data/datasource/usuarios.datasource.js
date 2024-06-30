class UsuariosDatasource {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async crearUsuario(nombreUsuario, recoveryKey) {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_usuario: nombreUsuario,
          recovery_key: recoveryKey
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear usuario: ' + response.status + ' ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async consultarUsuarios() {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al consultar usuarios: ' + response.status + ' ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al consultar usuarios:', error);
      throw error;
    }
  }
}

export default UsuariosDatasource;
