export interface Producto {
  pk_idproducto: number;
  comentario?: string;
  idmesa?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  amount?: 0;
  activo: boolean;
  stock: number;
  nombreFantasia: string;
  razonSocialEmpresa: string;
  nombreTipoProducto: string;
  pk_idtipoproducto: number;
  fk_idempresa: number;
}
