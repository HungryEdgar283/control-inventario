import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoProducto } from '../Modelo/TipoProducto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  Url = 'http://localhost:8080/tipos-producto'; 

  constructor(private http: HttpClient) { }

  getTipos(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.Url);
  }

  createTipo(tipoProducto: TipoProducto): Observable<any> {
    return this.http.post<any>(this.Url, tipoProducto);
  }

  getTipoId(id: number): Observable<TipoProducto> {
    return this.http.get<TipoProducto>(`${this.Url}/${id}`);
  }

  updateTipo(tipoProducto: TipoProducto): Observable<any> {
    return this.http.put<any>(`${this.Url}/${tipoProducto.id}`, tipoProducto);
  }

  deleteTipo(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`);
  }
}