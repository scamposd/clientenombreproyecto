import { Injectable, OnDestroy } from '@angular/core';
import { url } from '../config/url';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { StatusData } from '../interfaces/status-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy {

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
  
  
    loginUsuario(formato): Observable<any> {



      const url2 = this.url+ '/login';
      //console.log(formato)
      return this.http.post<StatusData>(url2, formato, { headers: this.headers })
        .pipe(map(data => {  
          this.login = data.data;      
          if (data.codigo === "000") {
            this.setUser(this.login);
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
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  setUser(user: Login): void {
    let user_string = JSON.stringify(user)
    localStorage.setItem('currentUser', user_string);
    localStorage.setItem('idLogin', user.pk_idpersona.toString());
  }
}
