-- Crear la base de datos FIUBITO
CREATE DATABASE IF NOT EXISTS FIUBITO;
USE FIUBITO;

-- Tabla ALUMNO
CREATE TABLE IF NOT EXISTS ALUMNO (
    padron BIGINT PRIMARY KEY
);

-- Tabla CARRERAS
CREATE TABLE IF NOT EXISTS CARRERAS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion FLOAT
);

ALTER TABLE carreras 
ADD CONSTRAINT UQ_CARRERAS_NOMBRE UNIQUE (nombre);

-- Tabla MATERIA
CREATE TABLE IF NOT EXISTS MATERIA (
    codigo VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    creditos INT,
    carrera_id INT,
    correlativas VARCHAR(200),
    FOREIGN KEY (carrera_id) REFERENCES CARRERAS(id)
);

-- Tabla ALUMNO_CARRERA (Tabla intermedia para carreras)
CREATE TABLE IF NOT EXISTS ALUMNO_CARRERA (
    alumno_padron BIGINT,
    carrera_id INT,
    FOREIGN KEY (alumno_padron) REFERENCES ALUMNO(padron),
    FOREIGN KEY (carrera_id) REFERENCES CARRERAS(id),
    PRIMARY KEY (alumno_padron, carrera_id)
);

-- Tabla ALUMNO_MATERIA (Tabla intermedia para materias)
CREATE TABLE IF NOT EXISTS ALUMNO_MATERIA (
    alumno_padron BIGINT,
    materia_codigo VARCHAR(10),
    FOREIGN KEY (alumno_padron) REFERENCES ALUMNO(padron),
    FOREIGN KEY (materia_codigo) REFERENCES MATERIA(codigo),
    PRIMARY KEY (alumno_padron, materia_codigo)
);

-- Tabla ALUMNO_APROBADA (Tabla intermedia para materias aprobadas)
CREATE TABLE IF NOT EXISTS ALUMNO_APROBADA (
    alumno_padron BIGINT,
    materia_codigo VARCHAR(10),
    FOREIGN KEY (alumno_padron) REFERENCES ALUMNO(padron),
    FOREIGN KEY (materia_codigo) REFERENCES MATERIA(codigo),
    PRIMARY KEY (alumno_padron, materia_codigo)
);

