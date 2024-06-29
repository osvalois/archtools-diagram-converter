require 'sinatra/base'

class ApplicationController < Sinatra::Base
  configure do
    set :public_folder, File.expand_path('../../public', __dir__)
    set :views, File.expand_path('../../public/scripts/core/presentation/views', __dir__)
  end

  # Ruta para servir el formulario de creación de usuario
  get '/usuarios/crear' do
    begin
      file_path = File.join(settings.public_folder, 'scripts/usuarios/presentation/views/crearUsuario.html')
      logger.info "Trying to send file: #{file_path}"

      if File.exist?(file_path)
        send_file file_path
      else
        logger.error "File not found: #{file_path}"
        raise Errno::ENOENT
      end
    rescue Errno::ENOENT
      logger.error "File crearUsuario.html not found in public directory: #{file_path}"
      status 404
      content_type :html
      erb :not_found, layout: false, locals: { file_path: request.path_info }
    end
  end

  # Ruta para servir el archivo index.html
  get '/' do
    begin
      file_path = File.join(settings.public_folder, 'index.html')
      logger.info "Trying to send file: #{file_path}"

      if File.exist?(file_path)
        send_file file_path
      else
        logger.error "File not found: #{file_path}"
        raise Errno::ENOENT
      end
    rescue Errno::ENOENT
      logger.error "File index.html not found in public directory: #{file_path}"
      status 404
      content_type :html
      erb :not_found, layout: false, locals: { file_path: request.path_info }
    end
  end

  # Handler para errores 404
  not_found do
    status 404
    content_type :html
    erb :not_found, layout: false, locals: { file_path: request.path_info }
  end
end

# Iniciar la aplicación Sinatra si se ejecuta este archivo directamente
run ApplicationController if __FILE__ == $0
