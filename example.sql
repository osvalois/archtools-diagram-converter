CREATE TABLE Usuario (
    id INT PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE Categoria (
    id INT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE Publicacion (
    id INT PRIMARY KEY,
    titulo VARCHAR(255),
    contenido TEXT,
    autor_id INT,
    categoria_id INT,
    fecha_publicacion DATE,
    FOREIGN KEY (autor_id) REFERENCES Usuario(id),
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);

CREATE TABLE Comentario (
    id INT PRIMARY KEY,
    contenido TEXT,
    usuario_id INT,
    publicacion_id INT,
    fecha_comentario DATE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (publicacion_id) REFERENCES Publicacion(id)
);

CREATE TABLE Etiqueta (
    id INT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE PublicacionEtiqueta (
    publicacion_id INT,
    etiqueta_id INT,
    PRIMARY KEY (publicacion_id, etiqueta_id),
    FOREIGN KEY (publicacion_id) REFERENCES Publicacion(id),
    FOREIGN KEY (etiqueta_id) REFERENCES Etiqueta(id)
);
