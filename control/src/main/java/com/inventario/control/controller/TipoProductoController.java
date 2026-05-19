package com.inventario.control.controller;

import com.inventario.control.entity.TipoProducto;
import com.inventario.control.business.TipoProductoBusiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tipos-producto")
@CrossOrigin(origins = "http://localhost:4200")
public class TipoProductoController {

    @Autowired
    private TipoProductoBusiness tipoProductoService;

    @GetMapping
    public List<TipoProducto> listarTipos() {
        return tipoProductoService.listarTodas();
    }

    @PostMapping
    public ResponseEntity<?> guardarTipo(@RequestBody TipoProducto tipoProducto) {
        if (tipoProductoService.existeDuplicado(tipoProducto.getNombre())) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error: Este tipo de producto ya está registrado.\"}");
        }
        return ResponseEntity.ok(tipoProductoService.guardar(tipoProducto));
    }

    @GetMapping("/{id}")
    public TipoProducto obtenerTipo(@PathVariable Long id) {
        return tipoProductoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarTipo(@PathVariable Long id, @RequestBody TipoProducto tipoProducto) {
        if (tipoProductoService.existeDuplicadoParaEditar(tipoProducto.getNombre(), id)) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error: Ya existe otro tipo de producto con ese nombre.\"}");
        }
        
        tipoProducto.setId(id);
        return ResponseEntity.ok(tipoProductoService.guardar(tipoProducto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTipo(@PathVariable Long id) {
        try {
            tipoProductoService.eliminar(id);
            return ResponseEntity.ok().body("{\"message\": \"Tipo de producto eliminado correctamente.\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("{\"message\": \"" + e.getMessage() + "\"}");
        }
    }
}