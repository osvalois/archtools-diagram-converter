# diagram.rb
class Diagram
    attr_reader :script_id, :nombre_archivo, :version_num, :script_sql, :comentario
  
    def initialize(script_id, nombre_archivo, version_num, script_sql, comentario)
      @script_id = script_id
      @nombre_archivo = nombre_archivo
      @version_num = version_num
      @script_sql = script_sql
      @comentario = comentario
    end
  end
  