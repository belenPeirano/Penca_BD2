-- Use the database
USE pencabdii;

-- Insert data into 'usuario' table
INSERT INTO usuario (ci, nombre, apellido, email, psw, rol) VALUES
('1234567890', 'Juan', 'Perez', 'juan.perez@example.com', 'password1', 'ESTUDIANTE'),
('0987654321', 'Maria', 'Gomez', 'maria.gomez@example.com', 'password2', 'ESTUDIANTE'),
('1122334455', 'Pedro', 'Lopez', 'pedro.lopez@example.com', 'password3', 'ESTUDIANTE'),
('6677889900', 'Ana', 'Martinez', 'ana.martinez@example.com', 'password4', 'ESTUDIANTE'),
('5566778899', 'Luis', 'Garcia', 'luis.garcia@example.com', 'password5', 'ESTUDIANTE'),
('3344556677', 'Marta', 'Sanchez', 'marta.sanchez@example.com', 'password6', 'ESTUDIANTE'),
('2233445566', 'Carlos', 'Ramirez', 'carlos.ramirez@example.com', 'password7', 'ESTUDIANTE'),
('4455667788', 'Lucia', 'Fernandez', 'lucia.fernandez@example.com', 'password8', 'ESTUDIANTE'),
('9988776655', 'Jorge', 'Hernandez', 'jorge.hernandez@example.com', 'password9', 'ESTUDIANTE'),
('7766554433', 'Elena', 'Diaz', 'elena.diaz@example.com', 'password10', 'ESTUDIANTE');

-- Insert data into 'carrera' table
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

-- Insert data into 'equipo' table
INSERT INTO equipo (nombre) VALUES
('Equipo A'),
('Equipo B'),
('Equipo C'),
('Equipo D'),
('Equipo E'),
('Equipo F'),
('Equipo G'),
('Equipo H'),
('Equipo I'),
('Equipo J');

-- Insert data into 'estudiante' table
INSERT INTO estudiante (ci, id_carrera, puntaje_total, predic_campeon, predic_subcampeon) VALUES
('1234567890', 1, 50, 1, 2),
('0987654321', 2, 40, 3, 4),
('1122334455', 3, 30, 5, 6),
('6677889900', 4, 20, 7, 8),
('5566778899', 5, 10, 9, 10),
('3344556677', 6, 60, 2, 3),
('2233445566', 7, 70, 4, 5),
('4455667788', 8, 80, 6, 7),
('9988776655', 9, 90, 8, 9),
('7766554433', 10, 100, 10, 1);

-- Insert data into 'fase' table
INSERT INTO fase (nombre) VALUES
('Fase de Grupos'),
('Cuartos de Final'),
('Semifinales'),
('Final');

-- Insert data into 'partido' table
INSERT INTO partido (fecha, lugar, fase, equipo_local, equipo_visitante, result_local, result_visitante) VALUES
('2024-06-01 18:00:00', 'Estadio 1', 1, 1, 2, 1, 0),
('2024-06-02 20:00:00', 'Estadio 2', 1, 3, 4, 2, 2),
('2024-06-03 22:00:00', 'Estadio 3', 1, 5, 6, 0, 3),
('2024-06-04 18:00:00', 'Estadio 4', 2, 7, 8, 2, 1),
('2024-06-05 20:00:00', 'Estadio 5', 2, 9, 10, 3, 2),
('2024-06-06 22:00:00', 'Estadio 6', 3, 1, 3, 1, 1),
('2024-06-07 18:00:00', 'Estadio 7', 3, 5, 7, 0, 1),
('2024-06-08 20:00:00', 'Estadio 8', 4, 9, 1, 2, 2),
('2024-06-09 22:00:00', 'Estadio 9', 4, 3, 5, 1, 3),
('2024-06-10 18:00:00', 'Estadio 10', 4, 7, 9, 2, 0);

-- Insert data into 'prediccion' table
INSERT INTO prediccion (id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante, puntaje) VALUES
(1, '1234567890', 1, 1, 0, 10),
(2, '0987654321', 3, 2, 2, 8),
(3, '1122334455', 6, 0, 3, 6),
(4, '6677889900', 7, 2, 1, 5),
(5, '5566778899', 9, 3, 2, 4),
(6, '3344556677', 1, 1, 1, 7),
(7, '2233445566', 7, 0, 1, 9),
(8, '4455667788', 9, 2, 2, 10),
(9, '9988776655', 5, 1, 3, 3),
(10, '7766554433', 7, 2, 0, 2);
