import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient,
              private cookieService:CookieService) { }


  loginUsuario(data:any):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios/signin`,data);
  }

  registrarUsuario(data:any):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios`,data);
  }

  obtenerTodosUsuarios():Observable<any>{
    return this.httpClient.get(`http://localhost:3000/usuarios`,{});
  }

  updateInfo(userInfo:any, idUser:number):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/usuarios/updateEmployee/${idUser}`, userInfo)
  }

  loggedIn(){
    return !!this.cookieService.get('token');
  }
}
 