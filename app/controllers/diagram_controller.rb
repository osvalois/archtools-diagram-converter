class DiagramController < Sinatra::Base
    post '/convert/sql/erb' do
      begin
        tempfile_sql = save_uploaded_file(params[:file][:tempfile])
  
        colors = extract_colors(params)
        erb_content = DiagramGenerator.new.generate_erb_from_sql(tempfile_sql.path, colors)
  
        content_type 'text/plain'
        erb_content
      rescue => e
        logger.error "Error processing SQL to ERB conversion: #{e.message}"
        status 500
        "Error converting SQL to ERB: #{e.message}"
      ensure
        tempfile_sql&.unlink
      end
    end
  
    post '/convert/erb/image' do
      begin
        tempfile_sql = save_uploaded_file(params[:file][:tempfile])
        colors = extract_colors(params)
  
        erb_content = DiagramGenerator.new.generate_erb_from_sql(tempfile_sql.path, colors)
        tempfile_erb = Tempfile.new(['diagram', '.erb'])
        File.open(tempfile_erb.path, 'wb') { |f| f.write(erb_content) }
  
        png_file = DiagramGenerator.new.convert_erb_to_png(tempfile_erb.path)
  
        send_file png_file, type: 'image/png', disposition: 'inline'
      rescue => e
        logger.error "Error processing conversion: #{e.message}"
        status 500
        "Error converting SQL to ERB and then to PNG: #{e.message}"
      ensure
        tempfile_sql&.close
        tempfile_sql&.unlink
        tempfile_erb&.close
        tempfile_erb&.unlink
      end
    end
  
    private
  
    def save_uploaded_file(file)
      tempfile = Tempfile.new(['input_sql', '.sql'])
      File.open(tempfile.path, 'wb') { |f| f.write(file.read) }
      tempfile
    end
  
    def extract_colors(params)
      {
        table_bgcolor: params[:table_bgcolor] || '#f8f8f8',
        header_bgcolor: params[:header_bgcolor] || '#4CAF50',
        header_text_color: params[:header_text_color] || '#ffffff',
        relationship_color: params[:relationship_color] || '#4CAF50',
        cell_text_color: params[:cell_text_color] || '#000000',
        font_family: params[:font_family] || 'Arial',
        shadow: params[:shadow] == 'true'
      }
    end
  end
  