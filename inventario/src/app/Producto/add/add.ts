import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductoService } from '../../Service/producto';
import { TipoProductoService } from '../../Service/tipo-producto';
import { Producto } from '../../Modelo/Producto';
import { TipoProducto } from '../../Modelo/TipoProducto';

@Component({
  selector: 'app-add-producto',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class AddProducto implements OnInit {
  
  producto: Producto = {
    id: 0,
    nombre: '',
    cantidad: 0,
    tipoProducto: { id: 0, nombre: '' }
  };

  tiposProducto: TipoProducto[] = [];

  @Output() alTerminarGuardar = new EventEmitter<void>();

  constructor(
    private productoService: ProductoService,
    private tipoService: TipoProductoService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.tipoService.getTipos().subscribe(data => {
      this.tiposProducto = data;
      this.cd.detectChanges();
    });
  }

  Guardar() {
    const nombreLimpio = this.producto.nombre?.trim();

    if (!nombreLimpio) {
      alert("Error: El campo Nombre del Producto no puede estar vacío.");
      return;
    }

    if (this.producto.cantidad < 0 || this.producto.cantidad === null) {
      alert("Error: La cantidad no puede ser un número negativo.");
      return;
    }

    if (!this.producto.tipoProducto || this.producto.tipoProducto.id === 0) {
      alert("Error: Debe seleccionar un Tipo de Producto válido.");
      return;
    }

    this.producto.nombre = nombreLimpio;
    
    this.productoService.createProducto(this.producto).subscribe({
      next: (data) => {
        alert("¡Producto agregado con éxito!");
        this.alTerminarGuardar.emit();
      },
      error: (err) => {
        if (err.status === 400) {
          alert("¡Error! Ya existe un producto con ese nombre dentro del sistema.");
        } else {
          alert("Ocurrió un error inesperado al guardar el producto.");
        }
      }
    });
  }
}