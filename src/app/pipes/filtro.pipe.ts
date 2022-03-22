import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[],
            texto: string='',
            columna: string ='name'
            ): any[] {



    if(texto === ''){
      console.log("texto",texto);
      return arreglo;
    }

    if(!arreglo){
      console.log("arreglo",arreglo);
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();
    //console.log('arregloPipe',arreglo);
    // assuming all these data are string type
    //const hayStack: string = (item.Task + item.StatusName + item.Date + item.Auditors).split(' ').join('').toLowerCase();
    //needle = needle.split(' ').join('').toLowerCase();
    //return hayStack.includes(needle);
    console.log("arreglo",arreglo);
    return arreglo.filter(
      item=>item[columna].toLowerCase().includes(texto)
      //console.log("");
      );
  }

}
