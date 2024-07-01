// usuarios.model.js

var UsuarioModel = {};

UsuarioModel.mapUsuario = function(usuarioData) {
  return {
    usuario_id: usuarioData.usuario_id,
    nombre_usuario: usuarioData.nombre_usuario,
    passphrase: usuarioData.passphrase,
    recovery_key: usuarioData.recovery_key,
    fecha_creacion: usuarioData.fecha_creacion
  };
};
