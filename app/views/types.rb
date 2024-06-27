TYPES_MAP = {
    int: [/int\d*/, 'integer', 'smallint', 'bigint'],
    uuid: ['uuid', 'uniqueidentifier'],
    varchar: [/character varying\d*/, 'varchar', 'char', 'nvarchar', 'nvarchar(max)'],
    text: ['text'],
    date: ['date', 'timestamp', 'datetime2'],
    boolean: ['boolean'],
    float: ['float', 'double precision', 'real'],
    decimal: [/numeric\d*/, 'decimal', 'money'],
    bytea: ['bytea'],
    json: ['json'],
    xml: ['xml']
  }.freeze