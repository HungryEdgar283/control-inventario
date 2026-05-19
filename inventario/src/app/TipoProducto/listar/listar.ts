import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TipoProductoService } from '../../Service/tipo-producto';
import { TipoProducto } from '../../Modelo/TipoProducto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-tipo-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class ListarTipoProducto implements OnInit {
  
  tipos: TipoProducto[] = [];

  @Output() alPresionarEditar = new EventEmitter<void>();

  constructor(private service: TipoProductoService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ListarTipos();
  }

  ListarTipos() {
    this.service.getTipos().subscribe(data => {
      this.tipos = data;
      this.cd.detectChanges();
    });
  }

  Listar() {
    this.ListarTipos();
  }

  Delete(tipo: TipoProducto): void {
    if (confirm("¿Eliminar el tipo de producto " + tipo.nombre + "?")) {
      this.service.deleteTipo(tipo.id).subscribe({
        next: (data) => {
          this.tipos = this.tipos.filter(t => t.id !== tipo.id);
          this.cd.detectChanges();
          alert("Registro eliminado");
        },
        error: (err) => {
          if (err.error && err.error.message) {
            alert(err.error.message);
          } else {
            alert("Error al intentar eliminar el tipo de producto.");
          }
        }
      });
    }
  }

  Editar(tipo: TipoProducto): void {
    localStorage.setItem("id", tipo.id.toString());
    this.alPresionarEditar.emit();
  }
}