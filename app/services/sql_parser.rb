class SqlParser
    def parse(sql_content)
      tables = parse_tables(sql_content)
      relationships = parse_relationships(sql_content)
      { tables: tables, relationships: relationships }
    end
    
    def parse_tables(sql_content)
      table_pattern = /CREATE\s+TABLE\s+(\w+)\s+\((.*?)\);/im
      tables = {}
  
      sql_content.scan(table_pattern) do |table_name, columns|
        columns = clean_columns(columns)
        tables[table_name] = columns
      end
  
      tables
    end
  
    def parse_relationships(sql_content)
      relationships = []
  
      relationships += parse_foreign_keys_in_tables(sql_content)
      relationships += parse_foreign_keys_alter_table(sql_content)
  
      relationships
    end
  
    def parse_foreign_keys_in_tables(sql_content)
      relationships = []
  
      fk_pattern_in_table = /FOREIGN\s+KEY\s*\((.*?)\)\s*REFERENCES\s*(\w+)\s*\((.*?)\)/im
      sql_content.scan(fk_pattern_in_table) do |column_from, table_to, column_to|
        table_from = sql_content[/CREATE\s+TABLE\s+(\w+)\s+\((?:(?!CREATE\s+TABLE).)*FOREIGN\s+KEY\s*\(#{column_from}\)/im, 1]
        relationships << {
          table_from: table_from.strip,
          column_from: column_from.strip,
          table_to: table_to.strip,
          column_to: column_to.strip
        }
      end
  
      relationships
    end
  
    def parse_foreign_keys_alter_table(sql_content)
      relationships = []
  
      relationship_pattern = /ALTER\s+TABLE\s+(\w+)\s+ADD\s+FOREIGN\s+KEY\s*\((.*?)\)\s+REFERENCES\s+(\w+)\s*\((.*?)\);/im
      sql_content.scan(relationship_pattern) do |table_from, column_from, table_to, column_to|
        relationships << {
          table_from: table_from.strip,
          column_from: column_from.strip,
          table_to: table_to.strip,
          column_to: column_to.strip
        }
      end
  
      relationships
    end
  
    def clean_columns(columns)
      columns.split(',').map(&:strip)
    end
  end
  