import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { MesaService } from './mesa.service';
import { Mesa } from '../interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class UtilitariosService {
  isLoading:any;
  mesas: Mesa[]=[];
  mensaje: string="";
  loginOk: boolean = false;
  timeout: number = 10000;
  constructor(private mesa: MesaService,public toastController: ToastController,
    public loadingController: LoadingController) { }

  async mostrarToast(mensaje: string, color_?: string, position_?, cssClass_?) {
    console.log("en toast controller");
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      color: color_,
      cssClass: cssClass_,
      position: position_,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    toast.present();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }







}
