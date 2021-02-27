import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { HomeComponent } from './home/home.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HomeComponent, UpdateInfoComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompanyModule { }
