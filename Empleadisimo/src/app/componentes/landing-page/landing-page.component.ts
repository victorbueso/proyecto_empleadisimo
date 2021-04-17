import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
 
  constructor(private helperService:HelperService,
              private cookieService:CookieService,
              private router:Router) { }

  ngOnInit(): void {
    this.helperService.navbarVisible.emit();
    if(this.cookieService.get('tipo') == '0'){
      this.router.navigate(['employee']);
    } else if(this.cookieService.get('tipo') == '1') {
      this.router.navigate(['company'])
    } else if(this.cookieService.get('tipo') == '2') {
      this.router.navigate(['admin'])
    } else this.router.navigate(['']);
  }

  abrirModal(){
    this.helperService.evento.emit();
  }

}
