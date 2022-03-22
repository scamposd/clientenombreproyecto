export interface Login {
  usuario: string;
  pk_idpersona: number;
  identificador: string;
  nombre: string;
  mail: string;
  activo: boolean;
  pass: string;
  fk_idPerfil: number;
  nombrePerfil: string;
  razonSocialEmpresa: string;
  urlLogoEmpresa: string;
  codigoEmpresa: number;
}
