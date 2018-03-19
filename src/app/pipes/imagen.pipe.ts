import { Pipe, PipeTransform } from '@angular/core';
import { url_servicios } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    if (img.indexOf('https') >= 0) {
      return img;
    }

    let url = url_servicios + '/img';
    if (!img) {
      return url + '/usuario/noimage';
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        url += '/usuario/noimage';
        break;
    }

    return url;
  }

}
