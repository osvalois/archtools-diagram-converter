class ApplicationController < Sinatra::Base
    configure do
      set :public_folder, File.expand_path('../../public', __dir__)
    end
  
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
        "<!DOCTYPE html>
        <html lang='en'>
        <head>
          <meta charset='UTF-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <title>Error 404</title>
        </head>
        <body>
          <h1>Error 404: Archivo no encontrado</h1>
          <p>El archivo index.html no se encuentra en el directorio público.</p>
          <p>Ruta buscada: #{file_path}</p>
        </body>
        </html>"
      end
    end
  end
  