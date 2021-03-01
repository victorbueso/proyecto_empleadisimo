import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { HomeComponent } from './home/home.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [HomeComponent, UpdateInfoComponent],
  exports: [MatSidenavModule],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule
  ]
})
export class CompanyModule { }
