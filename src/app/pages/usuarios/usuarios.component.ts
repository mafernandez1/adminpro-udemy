import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { url_servicios } from '../../config/config';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desdeTmp = this.desde + valor;

    if (desdeTmp >= this.totalRegistros) {
      return;
    }
    if (desdeTmp < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length > 0) {
      this.cargando = true;
      setTimeout(() => {
        this._usuarioService.buscarUsuario(termino)
          .subscribe((usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            this.cargando = false;
          });
      }, 200);
    } else {
      this.cargarUsuarios();
    }
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      alert('No puede borrar usuario');
      return;
    }

    if (confirm('¿Está seguro? Está a punto de borrar a ' + usuario.nombre)) {
      this._usuarioService.borrarUsuario(usuario._id)
        .subscribe((resp: any) => {
          this.desde = 0;
          this.cargarUsuarios();
          alert('El usuario ha sido eliminado correctamente');
        });
    }
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
