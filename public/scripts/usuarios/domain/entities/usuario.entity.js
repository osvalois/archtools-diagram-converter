// src/domain/entities/Usuario.js
export class Usuario {
    constructor(nombreUsuario, recoveryKey) {
      this.nombreUsuario = nombreUsuario;
      this.recoveryKey = recoveryKey;
    }
  }