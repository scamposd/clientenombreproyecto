import { Injectable } from '@angular/core';
import { UtilitariosService } from './utilitarios.service';
import { MesaService } from './mesa.service';
import { Mesa } from '../interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesasUtilitariosService {
mesas:Mesa[];
mensaje: string="";
loginOk: boolean = false;
timeout: number = 10000;
  constructor(private utilitarios: UtilitariosService, private mesa:MesaService) { }


  actualizarMesas(){

    // console.log('this.contrasena', this.contrasena);
  // console.log('this.perfil', this.perfil);
  let idColaborador=0; //Para que siempre muestre todas las mesas la primera            
  let suscript = this.mesa.obtenerMesas(idColaborador).subscribe(response=>{

    if(response){
              console.log("responseActualizarMesas",response);
              this.mesas = response;
              this.mesa.setearMesas(this.mesas);

        } else {
          // console.log('dentro de else');
          //this.loginIncorrecto = true;
          this.mensaje = response.descripcion; //'*Su nombre de usuario y/o contraseña no coiciden';
          // console.log("mensaje else", this.mensaje);
          this.utilitarios.mostrarToast(this.mensaje);
          this.utilitarios.dismiss();
        }
      },
      (error) => {
        //console.log('errorRqloginService', error);
        setTimeout(() => {
          if (!this.loginOk) {
            this.utilitarios.dismiss();
            suscript.unsubscribe();
            this.utilitarios.mostrarToast('¡Lo sentimos! Al parecer hemos perdido la conectividad con el servidor');
          }
        }, this.timeout);
      });

}
}
