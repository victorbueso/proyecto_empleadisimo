import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeEmployeeSliderService } from '../services/homeEmployeeSlider.service';
import { VerPublicacionesComponent } from './ver-publicaciones/ver-publicaciones.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, VerPublicacionesComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [HomeEmployeeSliderService]
})
export class EmployeeModule { }
