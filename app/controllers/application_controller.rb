class ApplicationController < Sinatra::Base
  configure do
    set :public_folder, File.expand_path('../../public', __dir__)
    set :views, File.expand_path('../../public/scripts/core/presentation/views', __dir__)
  end

  # Método para servir archivos estáticos de manera genérica
  def serve_static_file(file_path)
    if File.exist?(file_path)
      send_file file_path
    else
      logger.error "File not found: #{file_path}"
      raise Errno::ENOENT
    end
  rescue Errno::ENOENT
    logger.error "File not found in public directory: #{file_path}"
    status 404
    content_type :html
    erb :not_found, layout: false, locals: { file_path: request.path_info }
  end

  get '/login' do
    serve_static_file(File.join(settings.public_folder, 'scripts/usuarios/presentation/views/crearUsuario.view.html'))
  end

  get '/' do
    serve_static_file(File.join(settings.public_folder, 'index.html'))
  end

  # Manejador genérico para errores 404
  not_found do
    serve_static_file(File.join(settings.public_folder, '404.html'))
  end
end