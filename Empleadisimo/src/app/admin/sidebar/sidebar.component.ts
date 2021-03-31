import { Component, OnInit } from '@angular/core';
import { faUsersCog, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faHandshake} from '@fortawesome/free-regular-svg-icons';
import { UsuariosService } from '../../services/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { HelperService} from '../../services/helper.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faUsersCog = faUsersCog;
  farHandshake = faHandshake;
  faUsers = faUsers;
  faChartLine = faChartLine;
  public isSidebarCollapsed : Boolean = true;
  public usuarioLoggeado : any = [];
  public regionVisible : String = 'home';

  constructor(private usuariosService:UsuariosService,
    private cookiesService:CookieService,
    private helperService:HelperService) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e:any){
    {
      let element = document.querySelector('.sideMenu');
      if (window.pageYOffset > 0) {
        element?.classList.add('sideMenu-scrolled');
      } else {
        element?.classList.remove('sideMenu-scrolled');
      }
    }
  } 

  ngOnInit(): void {
    this.helperService.sidebarEvent.subscribe( () => {
      this.showSidebar();
    })

    this.usuariosService.getUser(this.cookiesService.get('idUser'))
    .subscribe( res => {
      this.usuarioLoggeado = res;
    }, error => console.log(error));
  }

  showSidebar(){
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
