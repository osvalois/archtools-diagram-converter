# usuario.rb
class Usuario
    attr_reader :usuario_id, :nombre_usuario, :passphrase, :recovery_key, :fecha_creacion
  
    def initialize(usuario_id, nombre_usuario, passphrase, recovery_key, fecha_creacion)
      @usuario_id = usuario_id
      @nombre_usuario = nombre_usuario
      @passphrase = passphrase
      @recovery_key = recovery_key
      @fecha_creacion = fecha_creacion
    end
  end