
-- Insertar datos de ejemplo

-- Insertar un usuario
INSERT INTO usuarios (nombre_usuario, passphrase, recovery_key)
VALUES ('usuario_demo', 'mi_passphrase_segura', 'mi_llave_de_recuperacion');

-- Insertar un script
INSERT INTO scripts (nombre_archivo)
VALUES ('esquema.sql');

-- Insertar una versión del script
INSERT INTO versiones_scripts (script_id, usuario_id, version_num, script_sql, comentario)
VALUES (
    (SELECT script_id FROM scripts WHERE nombre_archivo = 'esquema.sql'),
    (SELECT usuario_id FROM usuarios WHERE nombre_usuario = 'usuario_demo'),
    1,
    'CREATE TABLE example (id UUID PRIMARY KEY, name VARCHAR(100));',
    'Primera versión del script.'
);

-- Insertar un colaborador
INSERT INTO colaboradores (script_id, usuario_id, rol)
VALUES (
    (SELECT script_id FROM scripts WHERE nombre_archivo = 'esquema.sql'),
    (SELECT usuario_id FROM usuarios WHERE nombre_usuario = 'usuario_demo'),
    'autor'
);

-- Insertar una configuración
INSERT INTO configuraciones (script_id, configuracion)
VALUES (
    (SELECT script_id FROM scripts WHERE nombre_archivo = 'esquema.sql'),
    '{
        "colores": {
            "tablas": "#4a90e2",
            "lineas": "#f5a623",
            "textos": "#000000",
            "fondos": "#ffffff"
        },
        "logos": {
            "header_logo": "data:image/png;base64,...",
            "footer_logo": "data:image/png;base64,..."
        },
        "iconos": {
            "primary_key": "data:image/png;base64,...",
            "foreign_key": "data:image/png;base64,..."
        }
    }'::jsonb
);