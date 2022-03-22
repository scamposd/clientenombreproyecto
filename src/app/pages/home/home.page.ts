import { Component } from '@angular/core';
import { Sim } from '@ionic-native/sim/ngx';

import {MatSnackBar} from '@angular/material/snack-bar';

export class HomePageModule { }
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sim: Sim,private _snackBar: MatSnackBar) {
   
  }
  obtenerDatosTelefono(){

    this.sim.requestReadPermission().then((info)=>{
      alert(JSON.stringify(info));
    });
    
    this.sim.hasReadPermission().then((info)=>{
      alert(JSON.stringify(info));
    });
    
  
    this.sim.getSimInfo().then((info)=>{
    alert(JSON.stringify(info));

  });
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}


