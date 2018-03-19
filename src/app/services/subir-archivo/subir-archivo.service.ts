import { Injectable } from '@angular/core';
import { url_servicios } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            alert('Falló la subida');
            reject(JSON.parse(xhr.response));
          }
        }
      };

      const url = `${url_servicios}/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
