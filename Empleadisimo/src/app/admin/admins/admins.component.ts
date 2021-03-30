import { Component, OnInit } from '@angular/core';
import { faUserPlus, faUserEdit, faUserAltSlash, faUserTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  faUserPlus = faUserPlus;
  faUserEdit = faUserEdit;
  faUserAltSlash = faUserAltSlash;
  faUserTimes = faUserTimes;
  faUser = faUser;
  
  public admins:any = [];
  public systemLoggeado:Boolean = false;
  
  
  constructor(private cookiesService:CookieService,
    private usuariosService:UsuariosService,
    private modalService:NgbModal) { }

  open(content:any){
    this.modalService.open(content, {centered: true})
  }

  ngOnInit(): void {
    this.usuariosService.getAdmins()
    .subscribe(res => {
      this.admins = res.reverse();
    }, error => console.log(error));

    this.usuariosService.getUser(this.cookiesService.get('idUser'))
    .subscribe(res => {
      if(res.estado != 'default'){
        this.systemLoggeado = true;
      }
    }, error => console.log(error));
  }

  addAdmin(){
    this.modalService.dismissAll();
  }

  editAdmin(i:number){
    console.log(i)
  }

  blockAdmin(i:number){
    console.log(i)
  }

  unblockAdmin(i:number){
    console.log(i)
  }

  deleteAdmin(i:number){
    console.log(i)
  }
}
