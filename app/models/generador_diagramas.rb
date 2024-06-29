class DiagramGenerator
  def generate_erb_from_sql(sql_file, colors, border_width = '5')
    sql_content = File.read(sql_file)
    tables = SqlParser.new.parse_tables(sql_content)
    relationships = SqlParser.new.parse_relationships(sql_content)

    generate_erb_diagram(tables, relationships, colors, border_width)
  end

  def convert_erb_to_png(input_file)
    output_file = Tempfile.new(['diagram', '.png'])
    begin
      erb_content = ERB.new(File.read(input_file)).result
      tempfile_dot = Tempfile.new(['diagram', '.dot'])
      File.open(tempfile_dot.path, 'w') { |f| f.write(erb_content) }

      # Ajustar el comando para generar una imagen PNG con fondo transparente
      command = "dot -Tpng -Gbgcolor=transparent #{tempfile_dot.path} -o #{output_file.path}"
      Open3.popen3(command) do |_stdin, _stdout, stderr, wait_thr|
        exit_status = wait_thr.value
        error_output = stderr.read
        raise "Error converting ERB to PNG: #{error_output}" unless exit_status.success?
      end
      output_file.path
    rescue => e
      raise e
    ensure
      tempfile_dot&.close
      tempfile_dot&.unlink
      output_file&.close
    end
  end

  private

  def generate_erb_diagram(tables, relationships, colors, border_width)
    erb_content = <<~ERB
      digraph ER {
        graph [pad="0.5", nodesep="0.5", ranksep="1"]
        node [shape=plain, fontname="#{colors[:font_family]}"]
        rankdir=LR;

        // Definir nodos para las tablas
        #{generate_table_nodes(tables, colors, border_width)}

        // Definir relaciones entre las tablas
        #{generate_relationship_edges(relationships, colors)}
      }
    ERB

    erb_content
  end

  def generate_table_nodes(tables, colors, border_width)
    tables.map do |table, columns|
      generate_table_node(table.upcase, columns, colors, border_width)
    end.join("\n")
  end

  def generate_table_node(table, columns, colors, border_width)
    <<~TABLE
      "#{table}" [
        label=<
          <table border="0" cellborder="1" cellspacing="2" cellpadding="10" bgcolor="#{colors[:table_bgcolor]}" penwidth="#{border_width}" color="#{colors[:border_color]}">
            <tr>
              <td bgcolor="#{colors[:header_bgcolor]}" align="center" colspan="2" style="border-bottom: #{border_width}px solid #{colors[:border_color]};">
                <font color="#{colors[:header_text_color]}" face="#{colors[:font_family]}"><b>#{table}</b></font>
              </td>
            </tr>
            #{columns.map { |col| "<tr><td port=\"#{col_name(col)}\" align=\"left\" balign=\"left\" bgcolor=\"#{colors[:table_bgcolor]}\" sides=\"b\" bordercolor=\"#{colors[:header_bgcolor]}\" height=\"25\"><font color=\"#{colors[:cell_text_color]}\" style='font-weight: bold;' point-size='11'> #{COLUMN_ICONS[col_type(col)]} &nbsp; #{col}</font></td></tr>" }.join("\n")}
          </table>
        >];
    TABLE
  end

  def generate_relationship_edges(relationships, colors, line_style: 'dotted', line_width: 2)
    relationships.map do |rel|
      line_style_attr = "style=#{line_style}" if line_style && ['dotted', 'solid'].include?(line_style)
      line_width_attr = "penwidth=#{line_width}" if line_width && line_width.is_a?(Numeric) && line_width.positive?

      line_attrs = [line_style_attr, line_width_attr].compact.join(', ')

      "#{rel[:table_from].upcase}:#{rel[:column_from]} -> #{rel[:table_to].upcase}:#{rel[:column_to]} [label=\"\", arrowhead=open, color=\"#{colors[:relationship_color]}\", #{line_attrs}];"
    end.join("\n")
  end

  def col_type(column)
    type_part = column.split.last.downcase

    TYPES_MAP.each do |key, patterns|
      patterns.each do |pattern|
        if pattern.is_a?(Regexp)
          return key.to_s if type_part.match?(pattern)
        else
          return key.to_s if type_part == pattern
        end
      end
    end

    second_part = column.split[1]&.downcase

    TYPES_MAP.each do |key, patterns|
      patterns.each do |pattern|
        if pattern.is_a?(Regexp)
          return key.to_s if second_part&.match?(pattern)
        else
          return key.to_s if second_part == pattern
        end
      end
    end

    # Si no coincide con ningún patrón, devuelve el tipo original.
    type_part
  end

  def col_name(column)
    # Implementa la lógica para extraer el nombre de la columna
    # Suponiendo que las columnas están en formato "nombre tipo"
    column.split.first
  end
end
