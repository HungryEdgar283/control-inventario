package com.inventario.control.controller;

import com.inventario.control.entity.Producto;
import com.inventario.control.business.ProductoBusiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    @Autowired
    private ProductoBusiness productoService;

    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarTodas();
    }

    @PostMapping
    public ResponseEntity<?> guardarProducto(@RequestBody Producto producto) {
        if (productoService.existeDuplicado(producto.getNombre())) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error: Este producto ya está registrado.\"}");
        }
        return ResponseEntity.ok(productoService.guardar(producto));
    }

    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        if (productoService.existeDuplicadoParaEditar(producto.getNombre(), id)) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error: Ya existe otro producto con ese nombre.\"}");
        }
        
        producto.setId(id);
        return ResponseEntity.ok(productoService.guardar(producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.ok().body("{\"message\": \"Producto eliminado correctamente.\"}");
    }
}