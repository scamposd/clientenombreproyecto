import { Injectable } from '@angular/core';
import { url } from '../config/url';
import { urlpedido } from '../config/url';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { StatusData } from '../interfaces/status-data';
import { Pedidos } from '../interfaces/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  timeLeft: number = 1000000; //-->se debe setear en milisegundos
  timeLeftTimer: number = 0; //-->se debe setear en milisegundos
  interval: any;
  
  url: string = url;
  login: Login;
  
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router: Router) { }
  
  
    enviarComanda(formato: Pedidos[]): Observable<any> {



      const url2 = urlpedido+ '/Pedidos';
      //console.log(formato)
      return this.http.post<StatusData>(url2, formato, { headers: this.headers })
        .pipe(map(data => {  
          this.login = data.data;      
          if (data.codigo === "000") {
            return data;
            //this.setUser(this.login);
            // this.setToken(this.login.token);  
            // this.setUserLoggedIn(true);//-->setea observable que tiene flag de login activo/inactivo   
            // this.setSessionTimeRunningOut();//-->configura el mensaje termino del tiempo del token    
          }
          else {
            //return false;
            console.log('error');
          }     
          
        }

        ));
    
    }
  

   pedidosPendientes(idmesa: any, idempresa: number): Observable<any> {



      const url2 = urlpedido+ '/Pedidos/'+idmesa+"/"+idempresa;
      console.log('urlpedido:',url2);
      return this.http.get<StatusData>(url2,  { headers: this.headers })
        .pipe(map(data => {  
          this.login = data.data;      
          if (data.codigo === "000") {
            return data;
            //this.setUser(this.login);
            // this.setToken(this.login.token);  
            // this.setUserLoggedIn(true);//-->setea observable que tiene flag de login activo/inactivo   
            // this.setSessionTimeRunningOut();//-->configura el mensaje termino del tiempo del token    
          }else if(data.codigo === "002"){
            return data;
          }
          
        }

        ));
    
    }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  setUser(user: Login): void {
    let user_string = JSON.stringify(user)
    localStorage.setItem('currentUser', user_string);
    localStorage.setItem('idLogin', user.pk_idpersona.toString());
  }
}
