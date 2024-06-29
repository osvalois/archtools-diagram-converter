class UsuariosDatasource {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    // Método para crear usuario
    async crearUsuario(nombreUsuario, passphrase, recoveryKey) {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreUsuario, passphrase, recoveryKey })
      });
      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }
      return await response.json();
    }
  
    // Método para consultar usuarios
    async consultarUsuarios() {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al consultar usuarios');
      }
      return await response.json();
    }
  }
  
  export default UsuariosDatasource;
  