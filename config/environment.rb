require 'sinatra'
require 'erb'
require 'tempfile'
require 'open3'
require 'sinatra/base'
require 'pg'
require 'securerandom'
require 'sinatra/json'
require 'json'
require 'bcrypt'
require 'dotenv/load'
require 'open-uri'

require_relative '../app/controllers/application_controller'
require_relative '../app/controllers/diagrama_controller'
require_relative '../app/controllers/colaboradores_controller'
require_relative '../app/controllers/usuarios_controller'
require_relative '../app/models/generador_diagramas'
require_relative '../app/models/colaborador'
require_relative '../app/models/diagrama'
require_relative '../app/models/usuario'
require_relative '../app/services/sql_parser'
require_relative '../app/services/usuario_service'
require_relative '../app/views/icons'
require_relative '../app/views/types'
require_relative '../app/repository/colaborador_repository'
require_relative '../app/repository/diagrama_repository'
require_relative '../app/repository/usuario_repository'