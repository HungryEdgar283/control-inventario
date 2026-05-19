package com.inventario.control.repositorio;

import com.inventario.control.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long> {
    
    boolean existsByNombre(String nombre);
    
    boolean existsByNombreAndIdNot(String nombre, Long id);
}