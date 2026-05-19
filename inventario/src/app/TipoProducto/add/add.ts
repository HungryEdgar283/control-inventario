import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TipoProductoService } from '../../Service/tipo-producto';
import { TipoProducto } from '../../Modelo/TipoProducto';

@Component({
  selector: 'app-add-tipo-producto',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class AddTipoProducto {
  tipoProducto: TipoProducto = {
    id: 0,
    nombre: ''
  };

  @Output() alTerminarGuardar = new EventEmitter<void>();

  constructor(private service: TipoProductoService) { }

  Guardar() {
    const nombreLimpio = this.tipoProducto.nombre?.trim();

    if (!nombreLimpio) {
      alert("Error: El campo Nombre del Tipo de Producto no puede estar vacío.");
      return;
    }

    this.tipoProducto.nombre = nombreLimpio;
    this.service.createTipo(this.tipoProducto).subscribe({
      next: (data) => {
        alert("¡Tipo de producto agregado con éxito!");
        this.alTerminarGuardar.emit(); // Regresa a la tabla dinámicamente
      },
      error: (err: any) => {
        if (err.status === 400) {
          alert("¡Error! Ya existe un tipo de producto con ese nombre dentro del sistema.");
        } else {
          alert("Ocurrió un error inesperado.");
        }
      }
    });
  }
}