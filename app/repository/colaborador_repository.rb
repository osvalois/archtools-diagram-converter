# colaborador_repository.rb
class ColaboradorRepository
    def initialize(db_connection_string)
      @db = PG.connect(db_connection_string)
    end
  
    def guardar_colaborador(colaborador)
      @db.exec_params(
        "INSERT INTO colaboradores (colaborador_id, script_id, usuario_id, rol) VALUES ($1, $2, $3, $4)",
        [colaborador.colaborador_id, colaborador.script_id, colaborador.usuario_id, colaborador.rol]
      )
    end
  
    def obtener_colaboradores_por_script(script_id)
      result = @db.exec_params(
        "SELECT * FROM colaboradores WHERE script_id = $1 ORDER BY fecha_agregado ASC",
        [script_id]
      )
      result.map do |row|
        Colaborador.new(
          row['colaborador_id'],
          row['script_id'],
          row['usuario_id'],
          row['rol'],
          row['fecha_agregado']
        )
      end
    end
  end