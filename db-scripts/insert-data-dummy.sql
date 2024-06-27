USE pencabdii;

-- Insertar datos en tabla usuario
INSERT INTO usuario (ci, nombre, apellido, email, psw) VALUES
('1111111111', 'Maria', 'Gomez', 'maria@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK'),
('2222222222', 'Juan', 'Fernandez', 'juan@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK'),
('3333333333', 'Ramon', 'Puig', 'ramon@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK'),
('4444444444', 'Rodrigo', 'Pereira', 'rodrigo@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK'),
('5555555555', 'Lucia', 'Ferreira', 'lucia@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK'),
('6666666666', 'Jorge', 'Sales', 'jorge@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK'),
('7777777777', 'German', 'Lescano', 'german@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK'),
('8888888888', 'Matilda', 'Forteza', 'matilda@gmail.com', '$2a$10$dYlCw9r.V0xTNG4QUlf62OUFvzaPlwkGJs6h6A0MApZZJY.lDG6gK');

-- Insertar datos en tabla estudiante
INSERT INTO estudiante (ci, id_carrera, puntaje_total, predic_campeon, predic_subcampeon) VALUES
('1111111111', 1, 10, 1, 2),
('2222222222', 2, 10, 2, 3),
('3333333333', 1, 14, 1, 5),
('4444444444', 3, 4, 5, 4),
('5555555555', 1, 2, 1, 6),
('6666666666', 3, 6, 3, 1),
('7777777777', 5, 8, 1, 2),
('8888888888', 1, 2, 1, 3);

-- Insertar datos en tabla partido
INSERT INTO partido (fecha, lugar, fase, equipo_local, equipo_visitante) VALUES
('2024-06-20 21:00:00', 'Estadio Monumental', 1, 5, 7),
('2024-06-24 20:00:00', 'Estadio Único', 2, 6, 8),
('2024-07-02 19:00:00', 'Arena do Grêmio', 1, 9, 11),
('2024-07-04 20:00:00', 'Maracaná', 2, 10, 12),
('2024-07-05 18:30:00', 'Morumbi', 1, 13, 15),
('2024-07-06 20:30:00', 'Allianz Parque', 2, 14, 16),
('2024-07-07 19:00:00', 'Estadio Mineirão', 1, 1, 4),
('2024-07-08 18:00:00', 'Estadio Beira-Rio', 2, 2, 3),
('2024-07-09 21:00:00', 'Estadio Nacional', 1, 5, 8),
('2024-07-10 20:00:00', 'Estadio Monumental', 2, 6, 7);

-- Insertar datos en tabla prediccion
INSERT INTO prediccion (id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante, puntaje) VALUES
(1, "8888888888", 5, 2, 1, 0);