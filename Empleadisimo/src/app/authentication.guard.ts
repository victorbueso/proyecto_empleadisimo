import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UsuariosService } from "./services/usuarios.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private usuariosService:UsuariosService,
              private router:Router){}

  canActivate(route:ActivatedRouteSnapshot): boolean{
    const role = route.data.role;
    if(this.usuariosService.isAdminLogged() && role =='admin'){
      return true;
    } else if(this.usuariosService.isCompanyLogged() && role =='company'){
      return true;
    } else if(this.usuariosService.isEmployeeLogged() && role =='employee'){
      return true;
    }

    this.router.navigate([''])
    return false;
  }
  
}
