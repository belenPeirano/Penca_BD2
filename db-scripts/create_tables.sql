drop database pencabdii;
create database pencabdii;

use pencabdii;

CREATE TABLE usuario (
ci varchar(10) NOT NULL,
nombre varchar(50) NOT NULL,
apellido varchar(50) NOT NULL,
email varchar(30) NOT NULL unique,
psw varchar(100) NOT NULL,
rol varchar(20) NOT NULL default "ESTUDIANTE",
PRIMARY KEY (ci)
);

CREATE TABLE carrera (
id_carrera int auto_increment NOT NULL,
nombre varchar(50) NOT NULL,
PRIMARY KEY(id_carrera)
);

CREATE TABLE equipo (
id_equipo int auto_increment NOT NULL,
nombre varchar(50) NOT NULL,
PRIMARY KEY(id_equipo)
);

CREATE TABLE estudiante (
ci varchar(10) NOT NULL,
id_carrera int NOT NULL,
puntaje_total int NOT NULL default 0,
predic_campeon int NOT NULL,
predic_subcampeon int NOT NULL,
PRIMARY KEY(ci),
CONSTRAINT FOREIGN KEY(ci) REFERENCES usuario(ci),
CONSTRAINT FOREIGN KEY(id_carrera) REFERENCES carrera(id_carrera),
CONSTRAINT FOREIGN KEY(predic_campeon) REFERENCES equipo(id_equipo),
CONSTRAINT FOREIGN KEY(predic_subcampeon) REFERENCES equipo(id_equipo),
CONSTRAINT CHK_PREDICT check (predic_campeon <> predic_subcampeon)
);

CREATE TABLE fase (
id_fase int auto_increment NOT NULL,
nombre varchar(20) NOT NULL,
PRIMARY KEY(id_fase)
);

CREATE TABLE partido (
id_partido int auto_increment NOT NULL,
fecha datetime,
lugar varchar(100),
fase int NOT NULL,
equipo_local int,
equipo_visitante int,
result_local int,
result_visitante int,
PRIMARY KEY(id_partido),
CONSTRAINT FOREIGN KEY(equipo_local) REFERENCES equipo(id_equipo),
CONSTRAINT FOREIGN KEY(equipo_visitante) REFERENCES equipo(id_equipo),
CONSTRAINT FOREIGN KEY(fase) REFERENCES fase(id_fase),
CONSTRAINT CHK_PARTIDO check (equipo_local<>equipo_visitante)
);


CREATE TABLE prediccion (
id_prediccion int auto_increment NOT NULL,
id_partido int NOT NULL,
ci_estudiante varchar(10) NOT NULL,
equipo_ganador int NOT NULL,
result_local int NOT NULL,
result_visitante int NOT NULL,
puntaje int NOT NULL,
PRIMARY KEY(id_prediccion),
CONSTRAINT FOREIGN KEY(equipo_ganador) REFERENCES equipo(id_equipo),
CONSTRAINT FOREIGN KEY(id_partido) REFERENCES partido(id_partido),
CONSTRAINT FOREIGN KEY(ci_estudiante) REFERENCES estudiante(ci)
 );