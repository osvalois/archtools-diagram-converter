# diagram_repository.rb

class DiagramaRepository
  def initialize(db_connection_string)
    @db = PG.connect(db_connection_string)
  end

  def guardar_diagrama(diagram)
    @db.exec_params(
      "INSERT INTO versiones_scripts (script_id, version_num, script_sql, comentario) VALUES ($1, $2, $3, $4)",
      [diagram.script_id, diagram.version_num, diagram.script_sql, diagram.comentario]
    )
  end

  def obtener_diagramas_por_script(script_id)
    result = @db.exec_params(
      "SELECT * FROM versiones_scripts WHERE script_id = $1 ORDER BY version_num ASC",
      [script_id]
    )
    result.map do |row|
      Diagram.new(
        row['script_id'],
        nil, # nombre_archivo, no es parte de la tabla versiones_scripts
        row['version_num'].to_i,
        row['script_sql'],
        row['comentario']
      )
    end
  end
end
