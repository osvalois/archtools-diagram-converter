class SqlParser
  def parse(sql_content)
    tables = parse_tables(sql_content)
    relationships = parse_relationships(sql_content)
    indexes = parse_indexes(sql_content)
    constraints = parse_constraints(sql_content)
    { tables: tables, relationships: relationships, indexes: indexes, constraints: constraints }
  end

  def parse_tables(sql_content)
    table_pattern = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)(?:\.\w+)?\s*\((.*?)\)(?:\s*WITH\s*\(.*?\))?;/im
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
    relationships += parse_references_in_columns(sql_content)
    relationships
  end

  def parse_foreign_keys_in_tables(sql_content)
    relationships = []
    create_table_pattern = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)(?:\.\w+)?\s*\((.*?)\)(?:\s*WITH\s*\(.*?\))?;/im
    sql_content.scan(create_table_pattern) do |table_name, table_content|
      fk_pattern = /FOREIGN\s+KEY\s*\((\w+(?:,\s*\w+)*)\)\s*REFERENCES\s+(\w+)(?:\.\w+)?\s*\((\w+(?:,\s*\w+)*)\)(?:\s+ON\s+DELETE\s+(\w+))?(?:\s+ON\s+UPDATE\s+(\w+))?/i
      table_content.scan(fk_pattern) do |columns_from, table_to, columns_to, on_delete, on_update|
        columns_from.split(',').map(&:strip).each_with_index do |column_from, index|
          column_to = columns_to.split(',').map(&:strip)[index]
          relationships << {
            table_from: table_name,
            column_from: column_from,
            table_to: table_to,
            column_to: column_to,
            on_delete: on_delete,
            on_update: on_update
          }
        end
      end
    end
    relationships
  end

  def parse_foreign_keys_alter_table(sql_content)
    relationships = []
    alter_table_pattern = /ALTER\s+TABLE\s+(\w+)(?:\.\w+)?\s+ADD\s+(?:CONSTRAINT\s+\w+\s+)?FOREIGN\s+KEY\s*\((\w+(?:,\s*\w+)*)\)\s+REFERENCES\s+(\w+)(?:\.\w+)?\s*\((\w+(?:,\s*\w+)*)\)(?:\s+ON\s+DELETE\s+(\w+))?(?:\s+ON\s+UPDATE\s+(\w+))?/im
    sql_content.scan(alter_table_pattern) do |table_from, columns_from, table_to, columns_to, on_delete, on_update|
      columns_from.split(',').map(&:strip).each_with_index do |column_from, index|
        column_to = columns_to.split(',').map(&:strip)[index]
        relationships << {
          table_from: table_from,
          column_from: column_from,
          table_to: table_to,
          column_to: column_to,
          on_delete: on_delete,
          on_update: on_update
        }
      end
    end
    relationships
  end

  def parse_references_in_columns(sql_content)
    relationships = []
    create_table_pattern = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)(?:\.\w+)?\s*\((.*?)\)(?:\s*WITH\s*\(.*?\))?;/im
    sql_content.scan(create_table_pattern) do |table_name, table_content|
      column_pattern = /(\w+).*?REFERENCES\s+(\w+)(?:\.\w+)?\s*\((\w+)\)(?:\s+ON\s+DELETE\s+(\w+))?(?:\s+ON\s+UPDATE\s+(\w+))?/i
      table_content.scan(column_pattern) do |column_from, table_to, column_to, on_delete, on_update|
        relationships << {
          table_from: table_name,
          column_from: column_from,
          table_to: table_to,
          column_to: column_to,
          on_delete: on_delete,
          on_update: on_update
        }
      end
    end
    relationships
  end

  def parse_indexes(sql_content)
    indexes = []
    index_pattern = /CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s+ON\s+(\w+)(?:\.\w+)?\s*\((.*?)\)(?:\s+INCLUDE\s+\((.*?)\))?(?:\s+WHERE\s+(.*?))?;/im
    sql_content.scan(index_pattern) do |index_name, table_name, columns, include_columns, where_clause|
      indexes << {
        index_name: index_name,
        table_name: table_name,
        columns: columns.split(',').map(&:strip),
        include_columns: include_columns&.split(',')&.map(&:strip),
        where_clause: where_clause&.strip,
        unique: sql_content.match?(/CREATE\s+UNIQUE\s+INDEX/i)
      }
    end
    indexes
  end

  def parse_constraints(sql_content)
    constraints = []
    constraint_pattern = /(?:ALTER\s+TABLE\s+(\w+)(?:\.\w+)?\s+ADD\s+)?CONSTRAINT\s+(\w+)\s+(PRIMARY\s+KEY|UNIQUE|CHECK)\s*\((.*?)\)(?:\s+WHERE\s+(.*?))?;/im
    sql_content.scan(constraint_pattern) do |table_name, constraint_name, constraint_type, columns, where_clause|
      constraints << {
        table_name: table_name,
        constraint_name: constraint_name,
        constraint_type: constraint_type.upcase,
        columns: columns.split(',').map(&:strip),
        where_clause: where_clause&.strip
      }
    end
    constraints
  end

  def clean_columns(columns)
    columns.split(',').map do |column|
      column.strip.gsub(/\s+/, ' ')
    end
  end
end