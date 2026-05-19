package com.inventario.control.business;

import com.inventario.control.entity.TipoProducto;
import com.inventario.control.repositorio.TipoProductoRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoProductoBusiness {

    @Autowired
    private TipoProductoRepositorio tipoProductoRepository;
      
    public List<TipoProducto> listarTodas() {
        return tipoProductoRepository.findByOrderByIdAsc();
    }
  
    public TipoProducto guardar(TipoProducto tipoProducto) {
        if (tipoProducto.getId() != null && tipoProducto.getId() == 0) {
            tipoProducto.setId(null);
        }
        return tipoProductoRepository.save(tipoProducto);
    }
  
    public TipoProducto obtenerPorId(Long id) {
        return tipoProductoRepository.findById(id).orElse(null);
    }
  
    public void eliminar(Long id) {
        try {
            tipoProductoRepository.deleteById(id);
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new RuntimeException("No se puede eliminar el tipo de producto porque tiene productos asociados.");
        }
    }
    
    public boolean existeDuplicado(String nombre) {
        return tipoProductoRepository.existsByNombre(nombre);
    }
    
    public boolean existeDuplicadoParaEditar(String nombre, Long id) {
        return tipoProductoRepository.existsByNombreAndIdNot(nombre, id);
    }

    public TipoProducto actualizar(TipoProducto tipoProducto) {
        return tipoProductoRepository.save(tipoProducto);
    }
}