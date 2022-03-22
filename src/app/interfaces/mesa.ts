export interface Mesa {
  activo: boolean;
  apodo_mesa?: string;
  fk_idcolaborador: number;
  fk_idempresa: number;
  fk_idmesa?: number;
  idexterno?: number;
  pk_idcolaboradormesa?: number;
  plaza?: string;
  pendientes?: number;
}
