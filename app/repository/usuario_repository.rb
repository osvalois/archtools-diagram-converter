# usuario_repository.rb
class UsuarioRepository
  def initialize(db_connection_string)
    @db = PG.connect(db_connection_string)
  end

  def guardar_usuario(nombre_usuario, passphrase, recovery_key)
    raise "El nombre de usuario no puede estar vacío" if nombre_usuario.nil? || nombre_usuario.strip.empty?

    sql = 'INSERT INTO usuarios (nombre_usuario, passphrase, recovery_key) VALUES ($1, $2, $3)'
    begin
      @db.exec_params(sql, [nombre_usuario, passphrase, recovery_key])
    rescue PG::Error => e
      puts e.message
    ensure
      @db.close if @db
    end
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
