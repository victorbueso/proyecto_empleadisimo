import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit {

  constructor(private helperService:HelperService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.helperService.navbarNoVisible.emit();
    this.usuariosService.verifyAccount(this.activatedRoute.snapshot.params.id)
    .subscribe(() => {
    }, error => {
      console.log(error);
    })
  }

  home(){
    this.router.navigate(['/']);
  }

}
