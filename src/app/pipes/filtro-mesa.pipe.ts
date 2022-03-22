import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMesa'
})
export class FiltroMesaPipe implements PipeTransform {

    transform(arreglo: any[],
            texto: string='',
            columna: string ='name'
            ): any[] {



    if(texto === ''){
      return arreglo;
    }

    if(!arreglo){
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();
    //console.log('arregloPipe',arreglo);
    // assuming all these data are string type
    //const hayStack: string = (item.Task + item.StatusName + item.Date + item.Auditors).split(' ').join('').toLowerCase();
    //needle = needle.split(' ').join('').toLowerCase();
    //return hayStack.includes(needle);
    
    return arreglo.filter(
      item=>item[columna].toLowerCase().includes(texto));
  }

}
