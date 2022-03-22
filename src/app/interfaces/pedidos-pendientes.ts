export interface PedidosPendientes {
    pk_idcolaboradormesa?: number;
    pk_iddetalleservicio: number;
    fk_idservicio: number;
    idproducto: number;
    comentario: string;
    producto_entregado: false;
    tiempo_transcurrido_entrega?: string;
    cantidad: number;
    fk_mesa: number;
    fecha_ingreso: Date;
    inicio: Date;
    fin: Date;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    activo: Boolean;
    fk_idtipoproducto: number;
    nombretp: number;
    tiempo_transcurrido: string;
    entrega_cliente?: Date;
}


