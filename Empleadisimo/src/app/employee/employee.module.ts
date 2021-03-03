import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeEmployeeSliderService } from '../services/homeEmployeeSlider.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'
import { FilterPipe } from '../pipes/filter-location.pipe';
import { FilterPositionPipe } from '../pipes/filter-position.pipe'
import { PaginationPipe } from '../pipes/pagination.pipe';
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomMatPaginatorIntl } from './paginator-es';

@NgModule({
  declarations: [
    HomeComponent,
    FilterPipe, 
    FilterPositionPipe, 
    PaginationPipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgbModule,
    FontAwesomeModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [
    HomeEmployeeSliderService,
    {
      provide: MatPaginatorIntl,
      useClass : CustomMatPaginatorIntl
    }
  ]
})
export class EmployeeModule { }
