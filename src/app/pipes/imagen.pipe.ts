import { Pipe, PipeTransform } from '@angular/core';
import { url_servicios } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = url_servicios + '/img';

    if (!img) {
      return url + '/usuarios/noimage.jpg';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;

      case 'medicos':
        url += '/medicos/' + img;
        break;

      case 'hospitales':
        url += '/hospitales/' + img;
        break;

      default:
        url += '/usuarios/noimage';
        break;
    }

    return url;
  }

}
