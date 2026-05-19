import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TipoProductoService } from '../../Service/tipo-producto';
import { TipoProducto } from '../../Modelo/TipoProducto';

@Component({
  selector: 'app-edit-tipo-producto',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditTipoProducto implements OnInit {
  tipoProducto: TipoProducto = new TipoProducto();

  @Output() alTerminarActualizar = new EventEmitter<void>();

  constructor(private service: TipoProductoService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.CargarDatosTipo();
  }

  CargarDatosTipo() {
    let id = localStorage.getItem("id");
    if (id) {
      this.service.getTipoId(+id).subscribe(data => {
        this.tipoProducto = data;
        this.cd.detectChanges();
      });
    }
  }

  Actualizar() {
    const nombreLimpio = this.tipoProducto.nombre?.trim();

    if (!nombreLimpio) {
      alert("Error: El nombre del tipo de producto es obligatorio para actualizar.");
      return;
    }

    this.tipoProducto.nombre = nombreLimpio;

    this.service.updateTipo(this.tipoProducto).subscribe({
      next: (data) => {
        alert("¡Tipo de producto actualizado con éxito!");
        this.alTerminarActualizar.emit();
      },
      error: (err: any) => {
        if (err.status === 400) {
          alert("No se pudo actualizar: Ya existe otro tipo de producto registrado con este mismo nombre.");
        } else {
          alert("Ocurrió un error inesperado.");
        }
      }
    });
  }
}