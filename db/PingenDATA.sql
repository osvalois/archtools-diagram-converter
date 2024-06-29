-- Crear tabla de Usuarios
CREATE TABLE usuarios (
    usuario_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    passphrase TEXT NOT NULL,
    recovery_key TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Scripts
CREATE TABLE scripts (
    script_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_archivo VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Versiones de Scripts
CREATE TABLE versiones_scripts (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    script_id UUID REFERENCES scripts(script_id),
    usuario_id UUID REFERENCES usuarios(usuario_id),
    version_num INT NOT NULL,
    script_sql TEXT NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comentario TEXT
);

-- Crear tabla de Colaboradores
CREATE TABLE colaboradores (
    colaborador_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    script_id UUID REFERENCES scripts(script_id),
    usuario_id UUID REFERENCES usuarios(usuario_id),
    rol VARCHAR(50) NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Configuraciones
CREATE TABLE configuraciones (
    configuracion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    script_id UUID REFERENCES scripts(script_id),
    configuracion JSONB NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
