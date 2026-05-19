CREATE DATABASE IF NOT EXISTS control_inventario;
USE control_inventario;

CREATE TABLE tipos_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0,
    id_tipo_producto INT,
    
    CONSTRAINT fk_productos_tipos
    FOREIGN KEY (id_tipo_producto) REFERENCES tipos_producto(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);