package com.inventario.control.business;

import com.inventario.control.entity.Producto;
import com.inventario.control.repositorio.ProductoRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoBusiness {

    @Autowired
    private ProductoRepositorio productoRepository;
      
    public List<Producto> listarTodas() {
        return productoRepository.findAll();
    }
  
    public Producto guardar(Producto producto) {
        if (producto.getId() != null && producto.getId() == 0) {
            producto.setId(null);
        }
        return productoRepository.save(producto);
    }
  
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id).orElse(null);
    }
  
    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }
    
    public boolean existeDuplicado(String nombre) {
        return productoRepository.existsByNombre(nombre);
    }
    
    public boolean existeDuplicadoParaEditar(String nombre, Long id) {
        return productoRepository.existsByNombreAndIdNot(nombre, id);
    }

    public Producto actualizar(Producto producto) {
        return productoRepository.save(producto);
    }
}