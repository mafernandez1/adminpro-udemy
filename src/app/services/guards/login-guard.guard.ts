import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public _router: Router) { }

  canActivate(): boolean {
    if (!this._usuarioService.estaLogueado()) {
      this._router.navigate(['/login']);
      return false;
    }
    return this._usuarioService.estaLogueado();
  }
}
