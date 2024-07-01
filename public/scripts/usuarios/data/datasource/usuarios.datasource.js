// src/data/datasource/usuarios.datasource.js
export class UsuarioApiAdapter {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async crear(usuario) {
    const usuarioData = {
      nombre_usuario: usuario.nombreUsuario,
      recovery_key: usuario.recoveryKey
    };

    const response = await fetch(`${this.baseUrl}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioData),
    });
    return response.json();
  }

  async buscarPorNombre(nombreUsuario) {
    const response = await fetch(`${this.baseUrl}/usuarios/nombre/${nombreUsuario}`);
    return response.json();
  }
}