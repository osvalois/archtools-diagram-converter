# colaboradores_controller.rb
class ColaboradoresController < Sinatra::Base
  def initialize(app = nil)
    super(app)
    @colaborador_repository = ColaboradorRepository.new('postgresql://osvaloismtz:JX58MQsTLVSD@ep-proud-recipe-87355146.us-east-2.aws.neon.tech/fintech?sslmode=require')
  end

  post '/colaboradores' do
    script_id = params[:script_id]
    usuario_id = params[:usuario_id]
    rol = params[:rol]

    colaborador = Colaborador.new(nil, script_id, usuario_id, rol, nil)
    @colaborador_repository.guardar_colaborador(colaborador)

    redirect "/colaboradores/#{script_id}"
  end

  get '/colaboradores/:script_id' do
    script_id = params[:script_id]
    @colaboradores = @colaborador_repository.obtener_colaboradores_por_script(script_id)
    erb :colaboradores_list
  end
end
