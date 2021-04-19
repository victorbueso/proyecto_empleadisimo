import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.helperService.navbarNoVisible.emit();
  }

  returnHome(){
    this.router.navigate(['employee']);
  }

}
