import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { FiltroMesaPipe } from './filtro-mesa.pipe';



@NgModule({
  declarations: [FiltroPipe, FiltroMesaPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FiltroPipe,
    FiltroMesaPipe
  ]
})
export class PipesModule { }
