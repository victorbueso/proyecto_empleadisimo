import { Component, OnInit } from '@angular/core';
import { faUsersCog, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faHandshake} from '@fortawesome/free-regular-svg-icons';
import { UsuariosService } from '../../services/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { HelperService} from '../../services/helper.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faUsersCog = faUsersCog;
  farHandshake = faHandshake;
  faUsers = faUsers;
  public isSidebarCollapsed : Boolean = true;
  public usuarioLoggeado : any = [];
  public regionVisible : String = 'home';

  constructor(private usuariosService:UsuariosService,
    private cookiesService:CookieService,
    private helperService:HelperService) { }

  ngOnInit(): void {
    this.helperService.sidebarEvent.subscribe( () => {
      this.showSidebar();
    })

    this.usuariosService.getUser(this.cookiesService.get('idUser'))
    .subscribe( res => {
      this.usuarioLoggeado = res;
      console.log(this.usuarioLoggeado)
    }, error => console.log(error));
  }

  showSidebar(){
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
