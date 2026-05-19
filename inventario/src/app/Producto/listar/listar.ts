import { Component, OnInit, ChangeDetectorRef , Output, EventEmitter} from '@angular/core';
import { ProductoService } from '../../Service/producto';
import { Producto } from '../../Modelo/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class ListarProducto implements OnInit {
  
  productos: Producto[] = [];
  @Output() alPresionarEditar = new EventEmitter<void>();

  constructor(private service: ProductoService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ListarProductos();
  }

  ListarProductos() {
    this.service.getProductos().subscribe(data => {
      this.productos = data;
      this.cd.detectChanges();
    });
  }

  Listar() {
    this.ListarProductos();
  }

  Delete(producto: Producto): void {
    if (confirm("¿Eliminar el producto " + producto.nombre + "?")) {
      this.service.deleteProducto(producto.id).subscribe({
        next: (data) => {
          this.productos = this.productos.filter(p => p.id !== producto.id);
          this.cd.detectChanges();
          alert("Registro eliminado");
        },
        error: (err) => console.error("Error al eliminar", err)
      });
    }
  }

  Editar(producto: Producto): void {
    localStorage.setItem("id", producto.id.toString());
    this.alPresionarEditar.emit();
  }
}