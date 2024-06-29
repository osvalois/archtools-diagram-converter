# colaborador.rb
class Colaborador
    attr_reader :colaborador_id, :script_id, :usuario_id, :rol, :fecha_agregado
  
    def initialize(colaborador_id, script_id, usuario_id, rol, fecha_agregado)
      @colaborador_id = colaborador_id
      @script_id = script_id
      @usuario_id = usuario_id
      @rol = rol
      @fecha_agregado = fecha_agregado
    end
  end