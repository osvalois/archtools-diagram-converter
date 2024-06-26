require 'sinatra'
require 'erb'
require 'tempfile'
require 'open3'

require_relative '../app/controllers/application_controller'
require_relative '../app/controllers/diagram_controller'
require_relative '../app/models/diagram_generator'
require_relative '../app/services/sql_parser'
