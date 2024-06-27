USE pencabdii;

-- Insertar datos en la tabla usuario
INSERT INTO usuario (ci, nombre, apellido, email, psw, rol) VALUES
('1234567890', 'El', 'Admin', 'admin@admin.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK', 'ADMIN');

-- Insertar datos en la tabla carrera
INSERT INTO carrera (nombre) VALUES
('Ingeniería de Sistemas'),
('Ingeniería Civil'),
('Medicina'),
('Derecho'),
('Arquitectura'),
('Economía'),
('Administración de Empresas'),
('Biología'),
('Matemáticas'),
('Física');

-- Insertar datos en la tabla equipo
INSERT INTO equipo (nombre) VALUES
('Argentina'),
('Bolivia'),
('Brasil'),
('Canadá'),
('Chile'),
('Colombia'),
('Costa Rica'),
('Ecuador'),
('Estados Unidos'),
('Jamaica'),
('México'),
('Panamá'),
('Paraguay'),
('Perú'),
('Uruguay'),
('Venezuela');

-- Insertar datos en la tabla fase
INSERT INTO fase (nombre) VALUES
('GRUPOS'),
('CUARTOS'),
('SEMIFINAL'),
('TERCER'),
('FINAL');