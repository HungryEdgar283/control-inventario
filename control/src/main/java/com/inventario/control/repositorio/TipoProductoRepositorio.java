package com.inventario.control.repositorio;

import com.inventario.control.entity.TipoProducto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoProductoRepositorio extends JpaRepository<TipoProducto, Long> {
    
    boolean existsByNombre(String nombre);
    
    boolean existsByNombreAndIdNot(String nombre, Long id);
    
    List<TipoProducto> findByOrderByIdAsc();
}