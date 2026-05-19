import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../Service/producto';
import { TipoProductoService } from '../../Service/tipo-producto';
import { Producto } from '../../Modelo/Producto';
import { TipoProducto } from '../../Modelo/TipoProducto';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditProducto implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    cantidad: 0,
    tipoProducto: { id: 0, nombre: '' }
  };
  tiposProducto: TipoProducto[] = [];

  @Output() alTerminarActualizar = new EventEmitter<void>();

  constructor(
    private service: ProductoService, 
    private tipoService: TipoProductoService, 
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.CargarTipos();
    this.CargarDatosProducto();
  }

  CargarTipos() {
    this.tipoService.getTipos().subscribe(data => {
      this.tiposProducto = data;
      this.cd.detectChanges();
    });
  }

  CargarDatosProducto() {
    let id = localStorage.getItem("id");
    
    if (id) {
      this.service.getProductoId(+id).subscribe(data => {
        this.producto = data;
        
        if (!this.producto.tipoProducto) {
          this.producto.tipoProducto = { id: 0, nombre: '' };
        }

        this.cd.detectChanges();
      });
    }
  }

  Actualizar() {
    const nombreLimpio = this.producto.nombre?.trim();
    const tipoId = this.producto.tipoProducto?.id;

    if (!nombreLimpio) {
      alert("Error: El nombre del producto es obligatorio.");
      return;
    }

    if (this.producto.cantidad < 0 || this.producto.cantidad === null) {
      alert("Error: La cantidad no puede ser un número negativo.");
      return;
    }

    if (!tipoId || tipoId === 0) {
      alert("Error: Debes seleccionar un tipo de producto válido.");
      return;
    }

    this.producto.nombre = nombreLimpio;

    this.service.updateProducto(this.producto).subscribe({
      next: (data) => {
        alert("¡Producto actualizado con éxito!");
        this.alTerminarActualizar.emit();
      },
      error: (err: any) => {
        if (err.status === 400) {
          alert("No se puede actualizar, ya existe otro producto registrado con este mismo nombre.");
        } else {
          alert("Ocurrió un error inesperado.");
        }
      }
    });
  }
}