class UsuariosController < Sinatra::Base
  def initialize(app = nil)
    super(app)
    db_url = ENV['DATABASE_URL']  # Ensure DATABASE_URL is set in your environment
    usuario_repository = UsuarioRepository.new(db_url)
    @usuarios_service = UsuariosService.new(usuario_repository)
  end

  post '/usuarios' do
    request.body.rewind
    data = JSON.parse(request.body.read)

    nombre_usuario = data['nombre_usuario']
    recovery_key = data['recovery_key']

    if nombre_usuario.nil? || nombre_usuario.strip.empty? || recovery_key.nil? || recovery_key.strip.empty?
      halt 400, 'El nombre de usuario y la clave de recuperación son requeridos.'
    end

    begin
      passphrase = @usuarios_service.generar_passphrase
      @usuarios_service.registrar_usuario(nombre_usuario, passphrase)
      status 201
      json mensaje: 'Usuario creado con éxito', passphrase: passphrase
    rescue => e
      halt 500, "Error al crear usuario: #{e.message}"
    end
  end

  get '/usuarios/:usuario_id' do
    usuario_id = params[:usuario_id]
    @usuario = @usuarios_service.obtener_usuario_por_id(usuario_id)
    erb :usuario_detalle
  end

  post '/usuarios/authenticate' do
    request.body.rewind
    data = JSON.parse(request.body.read)

    nombre_usuario = data['nombre_usuario']
    recovery_key = data['recovery_key']

    if nombre_usuario.nil? || nombre_usuario.strip.empty? || recovery_key.nil? || recovery_key.strip.empty?
      halt 400, 'El nombre de usuario y la clave de recuperación son requeridos.'
    end

    autenticado = @usuarios_service.autenticar_usuario(nombre_usuario, recovery_key)
    if autenticado
      status 200
      json mensaje: 'Autenticación exitosa'
    else
      status 401
      json mensaje: 'Autenticación fallida'
    end
  end

  post '/usuarios/recover' do
    request.body.rewind
    data = JSON.parse(request.body.read)

    nombre_usuario = data['nombre_usuario']
    recovery_key = data['recovery_key']

    if nombre_usuario.nil? || nombre_usuario.strip.empty? || recovery_key.nil? || recovery_key.strip.empty?
      halt 400, 'El nombre de usuario y la clave de recuperación son requeridos.'
    end

    passphrase = @usuarios_service.recuperar_passphrase(nombre_usuario, recovery_key)
    if passphrase
      status 200
      json passphrase: passphrase
    else
      status 401
      json mensaje: 'No se pudo recuperar la passphrase'
    end
  end
end
