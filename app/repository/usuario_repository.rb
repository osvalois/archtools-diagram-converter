# usuario_repository.rb
class UsuarioRepository
    def initialize(db_connection_string)
      @db = PG.connect(db_connection_string)
    end
  
    def guardar_usuario(usuario)
      @db.exec_params(
        "INSERT INTO usuarios (usuario_id, nombre_usuario, passphrase, recovery_key) VALUES ($1, $2, $3, $4)",
        [usuario.usuario_id, usuario.nombre_usuario, usuario.passphrase, usuario.recovery_key]
      )
    end
  
    def obtener_usuario_por_id(usuario_id)
      result = @db.exec_params("SELECT * FROM usuarios WHERE usuario_id = $1", [usuario_id])
      return nil if result.num_tuples.zero?
  
      row = result.first
      Usuario.new(
        row['usuario_id'],
        row['nombre_usuario'],
        row['passphrase'],
        row['recovery_key'],
        row['fecha_creacion']
      )
    end
  
    def obtener_usuario_por_nombre(nombre_usuario)
      result = @db.exec_params("SELECT * FROM usuarios WHERE nombre_usuario = $1", [nombre_usuario])
      return nil if result.num_tuples.zero?
  
      row = result.first
      Usuario.new(
        row['usuario_id'],
        row['nombre_usuario'],
        row['passphrase'],
        row['recovery_key'],
        row['fecha_creacion']
      )
    end
  end