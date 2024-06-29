# usuarios_controller.rb
class UsuariosController < Sinatra::Base
    def initialize(app = nil)
      super(app)
      @usuario_repository = UsuarioRepository.new(ENV['DATABASE_URL'])
    end
  
    post '/usuarios' do
      nombre_usuario = params[:nombre_usuario]
      passphrase = params[:passphrase]
      recovery_key = params[:recovery_key]
  
      usuario = Usuario.new(nil, nombre_usuario, passphrase, recovery_key, nil)
      @usuario_repository.guardar_usuario(usuario)
  
      redirect '/usuarios'
    end
  
    get '/usuarios/:usuario_id' do
      usuario_id = params[:usuario_id]
      @usuario = @usuario_repository.obtener_usuario_por_id(usuario_id)
      erb :usuario_detalle
    end
  end