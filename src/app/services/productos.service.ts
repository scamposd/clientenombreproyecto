import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusData } from '../interfaces/status-data';
import { Observable } from 'rxjs';
import { urlproducto } from '../config/url';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = urlproducto;

  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });
  
  constructor(private http: HttpClient) { }

  obtenerProductos(idEmpresa: number): Observable<any> {



    const url2 = this.url+ '/producto/' + idEmpresa.toString();
    //console.log(formato)
    return this.http.get<StatusData>(url2, { headers: this.headers })
      .pipe(map(data => {  
        //this.persona = data.data;
        
        //console.log('data', this.persona);
        if (data.codigo === "000") {
          
          // this.setToken(this.login.token);  
          // this.setUserLoggedIn(true);//-->setea observable que tiene flag de login activo/inactivo   
          // this.setSessionTimeRunningOut();//-->configura el mensaje termino del tiempo del token    
        }
        else {
          //return false;
          console.log('error');
        }     
        return data;
      }
      ));
  
  }

}
