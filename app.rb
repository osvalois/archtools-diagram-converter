require 'sinatra'
require './config/environment'

class App < Sinatra::Base
  set :port, 4567
  set :bind, '0.0.0.0'
  set :public_folder, File.expand_path('../public', __dir__)

  use ApplicationController
  use DiagramController
  use UsuariosController
  use ColaboradoresController
  
  run! if app_file == $0
end
