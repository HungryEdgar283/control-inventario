import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../Modelo/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  Url = 'http://localhost:8080/productos'; 

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.Url);
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.Url, producto);
  }

  getProductoId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.Url}/${id}`);
  }

  updateProducto(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.Url}/${producto.id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`);
  }
}