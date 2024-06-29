// usuario.entity.js

function Usuario(usuarioId, nombreUsuario, passphrase, recoveryKey, fechaCreacion) {
    this.usuarioId = usuarioId;
    this.nombreUsuario = nombreUsuario;
    this.passphrase = passphrase;
    this.recoveryKey = recoveryKey;
    this.fechaCreacion = fechaCreacion;
  }
  
  // Métodos de instancia (opcional)
  Usuario.prototype.getUsuarioId = function() {
    return this.usuarioId;
  };
  
  Usuario.prototype.getNombreUsuario = function() {
    return this.nombreUsuario;
  };
  
  // Otros métodos según necesidad...
  
  module.exports = Usuario;
  