import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarProducto } from './Producto/listar/listar';
import { ListarTipoProducto } from './TipoProducto/listar/listar';
import { AddProducto } from './Producto/add/add';
import { AddTipoProducto } from './TipoProducto/add/add';
import { EditProducto } from './Producto/edit/edit';
import { EditTipoProducto } from './TipoProducto/edit/edit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    ListarProducto, 
    ListarTipoProducto, 
    AddProducto, 
    AddTipoProducto, 
    EditProducto, 
    EditTipoProducto
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  
  title = 'control-inventario-frontend';
  seccionActual: string = 'productos'; 
  vistaProducto: string = 'listar';
  vistaTipo: string = 'listar';

  constructor(public cd: ChangeDetectorRef) {}

  cambiarSeccion(seccion: string): void {
    this.seccionActual = seccion;
    this.cd.detectChanges();
  }

  Listar(): void {
    if (this.seccionActual === 'productos') {
      this.vistaProducto = 'listar';
    } else if (this.seccionActual === 'tipos') {
      this.vistaTipo = 'listar';
    }
    this.cd.detectChanges();
  }

  Nuevo(): void {
    if (this.seccionActual === 'productos') {
      this.vistaProducto = 'agregar';
    } else if (this.seccionActual === 'tipos') {
      this.vistaTipo = 'agregar';
    }
    this.cd.detectChanges();
  }
}