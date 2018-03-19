import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { url_servicios } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string) {
    const url = url_servicios + '/login/google';

    return this.http.post(url, { token: token })
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      });
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = url_servicios + '/login';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      });
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    const url = url_servicios + '/usuario';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        alert('Usuario creado');
        return resp.usuario;
      });
  }

  actualizarUsuario(usuario: Usuario) {
    const url = url_servicios + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        alert('Usuario actualizado');
        return true;
      });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(id, this.token, resp.usuario);
      }).catch(resp => console.log(resp));
  }

}
