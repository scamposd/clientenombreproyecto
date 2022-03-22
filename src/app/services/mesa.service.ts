import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusData } from '../interfaces/status-data';
import { Observable } from 'rxjs';
import { urlmesa } from '../config/url';
import { map } from 'rxjs/operators';
import { Mesa } from '../interfaces/mesa';
import { Pedidos } from '../interfaces/pedidos';
import { PedidosPendientes } from '../interfaces/pedidos-pendientes';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  url: string = urlmesa;
  mesas: Mesa[]=[];
  mesaSeleccionada: Mesa;
  idcolaborador: number;
  idempresa: number;
  jsonPedidosPendientes: PedidosPendientes[] = [];
  jsonPedidos:Mesa[]=[];
  persona: Persona;

  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });
  
  constructor(private http: HttpClient) { }

  obtenerMesas(idColaborador: number): Observable<any> {


    console.log("urlMesa get",idColaborador);   
    const url2 = this.url+ '/mesa/' + idColaborador;
    //console.log(formato)
    return this.http.get<StatusData>(url2, { headers: this.headers })
      .pipe(map(data => {  
        //this.persona = data.data;
        
        //console.log('dataService', data[0].fk_idcolaborador);
        //console.log('dataService', data[0].fk_idempresa);
        
        if (data.codigo === "000") {
         
           this.mesas=data.data;
           console.log("responseMesas",this.mesas);   
        //this.idcolaborador=data[0].fk_idcolaborador;
        //this.idempresa=data[0].fk_idempresa;
          // this.setToken(this.login.token);  
          // this.setUserLoggedIn(true);//-->setea observable que tiene flag de login activo/inactivo   
          // this.setSessionTimeRunningOut();//-->configura el mensaje termino del tiempo del token    
          return this.mesas;
        
        }     
        return this.mesas;
      }
      ));
  
  }


  obtenerPedidosPendientes(mesas:Mesa[])
  {
    //this.jsonPedidosPendientes;

    //for (let pedido of pedidoSolicitado) {
//
    //}

    for (let x = 0; x < mesas.length; x++) {

      
      this.jsonPedidos.push({
        activo: mesas[x].activo,
        apodo_mesa: mesas[x].apodo_mesa, ​​
        fk_idcolaborador: mesas[x].fk_idcolaborador,
        fk_idempresa: mesas[x].fk_idempresa,
        fk_idmesa: mesas[x].fk_idmesa,
        idexterno: mesas[x].idexterno,
        pk_idcolaboradormesa: mesas[x].pk_idcolaboradormesa,
        plaza: mesas[x].plaza,
      });





      //console.log("mesas",mesas);
      //this.jsonPedidosPendientes.push({
      //  //pk_idcolaboradormesa?: number;
      //  pk_iddetalleservicio: this.mesas[x].pk_iddetalleservicio
      //  fk_idservicio: number;
      //  idproducto: number;
      //  comentario: string;
      //  producto_entregado: false;
      //  cantidad: number;
      //  fk_mesa: number,
      //  inicio: Date;
      //  fin: Date;
      //  nombre: string;
      //  descripcion: string;
      //  precio: number;
      //  stock: number;
      //  activo: Boolean;
      //  fk_idtipoproducto: number;
      //  nombretp: number;
      //});
    }

    console.log('jp', JSON.stringify(this.jsonPedidosPendientes));
    
  }

  setearMesaSeleccionada(mesa: Mesa){
    //console.log("setearMesaSeleccionada",this.mesaSeleccionada);
    this.mesaSeleccionada=mesa;
    console.log("setearMesaSeleccionada",this.mesaSeleccionada);
}

obtenerMesaSeleccionada(){
  return this.mesaSeleccionada;
}

  setearMesas(mesas: Mesa[]){
      this.mesas=mesas;
  }

  setearColaborador(persona: Persona){
    this.persona=persona;
    this.idcolaborador=persona.idColaborador;
}
obtenerColaborador(){
  return this.persona;
}

setearEmpresa(idempresa: number){
  this.idempresa=idempresa;
}

obtenerIdColaborador(){
  return this.idcolaborador;
}

obtenerIdEmpresa(){
  return this.idempresa;
}


  crearMesa(mesa: any): Observable<any> {
    //let token = this.loginService.getToken();
    //console.log('jsonFormatoulecturas', jsonFormato);
    console.log('mesa', mesa);

    const url2 = urlmesa + '/mesa/';

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': "Bearer " + token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<StatusData>(url2, mesa, httpOptions);
  }




}
