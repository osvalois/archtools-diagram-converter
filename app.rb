require 'sinatra'
require 'erb'
require 'tempfile'
require 'open3'

set :port, 4567
set :bind, '0.0.0.0'
set :public_folder, 'public'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end
post '/convert/sql/erb' do
  tempfile_sql = nil
  erb_file = nil

  begin
    tempfile_sql = Tempfile.new(['input_sql', '.sql'])
    tempfile_sql.write(params[:file][:tempfile].read)
    tempfile_sql.close

    table_bgcolor = params[:table_bgcolor] || '#f8f8f8'
    header_bgcolor = params[:header_bgcolor] || '#4CAF50'
    header_text_color = params[:header_text_color] || '#ffffff'
    relationship_color = params[:relationship_color] || '#4CAF50'
    cell_text_color = params[:cell_text_color] || '#000000'
    font_family = params[:font_family] || 'Arial'
    shadow = params[:shadow] == 'true'

    erb_content = generate_erb_from_sql(tempfile_sql.path, table_bgcolor, header_bgcolor, header_text_color, relationship_color, cell_text_color, font_family, shadow)

    # Return ERB content as response
    content_type 'text/plain'
    erb_content
  rescue => e
    logger.error "Error processing SQL to ERB conversion: #{e.message}"
    status 500
    "Error converting SQL to ERB: #{e.message}"
  ensure
    tempfile_sql&.unlink   # Borra el archivo temporal SQL
    erb_file&.unlink       # Borra el archivo temporal ERB
  end
end


post '/convert/erb/image' do
  tempfile_sql = Tempfile.new(['input_sql', '.sql'])
  tempfile_erb = Tempfile.new(['diagram', '.erb'])
  begin
    # Guardar el archivo SQL subido en un tempfile
    File.open(tempfile_sql.path, 'wb') do |f|
      f.write(params[:file][:tempfile].read)
    end

    # Extraer los colores y estilos de los parámetros de la solicitud
    table_bgcolor = params[:table_bgcolor] || '#f8f8f8'
    header_bgcolor = params[:header_bgcolor] || '#4CAF50'
    header_text_color = params[:header_text_color] || '#ffffff'
    relationship_color = params[:relationship_color] || '#4CAF50'
    cell_text_color = params[:cell_text_color] || '#000000'
    font_family = params[:font_family] || 'Arial'
    shadow = params[:shadow] == 'true'

    # Analizar el archivo SQL y generar el diagrama ERB
    erb_content = generate_erb_from_sql(tempfile_sql.path, table_bgcolor, header_bgcolor, header_text_color, relationship_color, cell_text_color, font_family, shadow)
    File.open(tempfile_erb.path, 'wb') do |f|
      f.write(erb_content)
    end

    # Convertir el archivo ERB a PNG usando Graphviz (dot)
    png_file = convert_erb_to_png(tempfile_erb.path)

    # Devolver el archivo PNG generado
    send_file png_file, type: 'image/png', disposition: 'inline'
  rescue => e
    logger.error "Error processing conversion: #{e.message}"
    status 500
    "Error converting SQL to ERB and then to PNG: #{e.message}"
  ensure
    tempfile_sql.close
    tempfile_sql.unlink
    tempfile_erb.close
    tempfile_erb.unlink
  end
end

def generate_erb_from_sql(sql_file, table_bgcolor, header_bgcolor, header_text_color, relationship_color, cell_text_color, font_family, shadow)
  # Lee el contenido del archivo SQL
  sql_content = File.read(sql_file)

  # Parsea las tablas y relaciones desde el SQL
  tables = parse_tables(sql_content)
  relationships = parse_relationships(sql_content)

  # Genera el contenido ERB para el diagrama
  erb_content = generate_erb_diagram(tables, relationships, table_bgcolor, header_bgcolor, header_text_color, relationship_color, cell_text_color, font_family, shadow)

  erb_content
end

def parse_tables(sql_content)
  # Patrón para encontrar definiciones de tablas
  table_pattern = /CREATE\s+TABLE\s+(\w+)\s+\((.*?)\);/im

  tables = {}
  sql_content.scan(table_pattern) do |table_name, columns|
    tables[table_name] = columns.split(',').map(&:strip)
  end

  tables
end

def parse_relationships(sql_content)
  # Patrón para encontrar claves foráneas en las definiciones de las tablas
  fk_pattern_in_table = /FOREIGN\s+KEY\s*\((.*?)\)\s*REFERENCES\s*(\w+)\s*\((.*?)\)/im

  relationships = []
  sql_content.scan(fk_pattern_in_table) do |column_from, table_to, column_to|
    table_from = sql_content[/CREATE\s+TABLE\s+(\w+)\s+\((?:(?!CREATE\s+TABLE).)*FOREIGN\s+KEY\s*\(#{column_from}\)/im, 1]
    relationships << {
      table_from: table_from,
      column_from: column_from,
      table_to: table_to,
      column_to: column_to
    }
  end

  # Patrón para encontrar claves foráneas en las declaraciones ALTER TABLE
  relationship_pattern = /ALTER\s+TABLE\s+(\w+)\s+ADD\s+FOREIGN\s+KEY\s*\((.*?)\)\s+REFERENCES\s+(\w+)\s*\((.*?)\);/im
  sql_content.scan(relationship_pattern) do |table_from, column_from, table_to, column_to|
    relationships << {
      table_from: table_from,
      column_from: column_from,
      table_to: table_to,
      column_to: column_to
    }
  end

  relationships
end

def generate_erb_diagram(tables, relationships, table_bgcolor, header_bgcolor, header_text_color, relationship_color, cell_text_color, font_family, shadow)
  erb_content = <<~ERB
    digraph ER {
      graph [pad="0.5", nodesep="0.5", ranksep="1"]
      node [shape=plain, fontname="#{font_family}"]
      rankdir=LR;

      // Definir nodos para las tablas
      #{tables.keys.map { |table| "#{table} [label=<<table border=\"0\" cellborder=\"1\" cellspacing=\"0\" cellpadding=\"10\" bgcolor=\"#{table_bgcolor}\" #{'style=shadow' if shadow}><tr><td colspan=\"2\" bgcolor=\"#{header_bgcolor}\" align=\"center\"><font color=\"#{header_text_color}\"><b>#{table}</b></font></td></tr>#{tables[table].map { |col| "<tr><td port=\"#{col.split.first}\" align=\"left\" balign=\"left\"><font color=\"#{cell_text_color}\">#{col}</font></td></tr>" }.join}</table>>];" }.join("\n")}

      // Definir relaciones entre las tablas
      #{relationships.map { |rel| "#{rel[:table_from]}:#{rel[:column_from].split.first} -> #{rel[:table_to]}:#{rel[:column_to].split.first} [arrowhead=crow, color=\"#{relationship_color}\"];" }.join("\n")}
    }
  ERB

  erb_content
end

def convert_erb_to_png(input_file)
  output_file = Tempfile.new(['diagram', '.png'])
  begin
    # Primero, renderiza el archivo ERB
    erb_content = ERB.new(File.read(input_file)).result

    # Escribe el contenido renderizado a un archivo temporal .dot
    tempfile_dot = Tempfile.new(['diagram', '.dot'])
    File.open(tempfile_dot.path, 'wb') do |f|
      f.write(erb_content)
    end

    # Luego, convierte el archivo .dot a PNG usando Graphviz (dot)
    command = "dot -Tpng #{tempfile_dot.path} -o #{output_file.path}"
    Open3.popen3(command) do |_stdin, _stdout, stderr, wait_thr|
      exit_status = wait_thr.value
      error_output = stderr.read
      raise "Error converting ERB to PNG: #{error_output}" unless exit_status.success?
    end
    output_file.path
  rescue => e
    logger.error "Error in convert_erb_to_png: #{e.message}"
    raise e
  ensure
    tempfile_dot.close
    tempfile_dot.unlink
    output_file.close
  end
end
