import { TipoProducto } from './TipoProducto';

export class Producto {
    id!: number;
    nombre!: string;
    cantidad!: number;
    tipoProducto!: TipoProducto;
}