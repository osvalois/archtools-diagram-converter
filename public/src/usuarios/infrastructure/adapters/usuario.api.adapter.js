// src/infrastructure/adapters/usuarioApiAdapter.js
export class UsuarioApiAdapter {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async crear(usuario) {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
      return response.json();
    }
  
    async buscarPorNombre(nombreUsuario) {
      const response = await fetch(`${this.baseUrl}/usuarios/nombre/${nombreUsuario}`);
      return response.json();
    }
  }
  