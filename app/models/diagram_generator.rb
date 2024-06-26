class DiagramGenerator
    def generate_erb_from_sql(sql_file, colors)
      sql_content = File.read(sql_file)
      tables = SqlParser.new.parse_tables(sql_content)
      relationships = SqlParser.new.parse_relationships(sql_content)
  
      generate_erb_diagram(tables, relationships, colors)
    end
  
    def convert_erb_to_png(input_file)
      output_file = Tempfile.new(['diagram', '.png'])
      begin
        erb_content = ERB.new(File.read(input_file)).result
        tempfile_dot = Tempfile.new(['diagram', '.dot'])
        File.open(tempfile_dot.path, 'wb') { |f| f.write(erb_content) }
  
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
        tempfile_dot&.close
        tempfile_dot&.unlink
        output_file&.close
      end
    end
  
    private
  
    def generate_erb_diagram(tables, relationships, colors)
      <<~ERB
        digraph ER {
          graph [pad="0.5", nodesep="0.5", ranksep="1"]
          node [shape=plain, fontname="#{colors[:font_family]}"]
          rankdir=LR;
  
          // Definir nodos para las tablas
          #{tables.keys.map { |table| generate_table_node(table, tables[table], colors) }.join("\n")}
  
          // Definir relaciones entre las tablas
          #{relationships.map { |rel| generate_relationship_edge(rel, colors[:relationship_color]) }.join("\n")}
        }
      ERB
    end
  
    def generate_table_node(table, columns, colors)
      <<~TABLE
        #{table} [label=<<table border="0" cellborder="1" cellspacing="0" cellpadding="10" bgcolor="#{colors[:table_bgcolor]}" #{'style=shadow' if colors[:shadow]}>
        <tr><td colspan="2" bgcolor="#{colors[:header_bgcolor]}" align="center"><font color="#{colors[:header_text_color]}"><b>#{table}</b></font></td></tr>
        #{columns.map { |col| "<tr><td port=\"#{col.split.first}\" align=\"left\" balign=\"left\"><font color=\"#{colors[:cell_text_color]}\">#{col}</font></td></tr>" }.join}
        </table>>];
      TABLE
    end
  
    def generate_relationship_edge(rel, relationship_color)
      "#{rel[:table_from]} -> #{rel[:table_to]} [label=\"#{rel[:column_from]} -> #{rel[:column_to]}\", arrowhead=open, color=\"#{relationship_color}\"];"
    end
  end
  