import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { HomeComponent } from './home/home.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PaginationPipe } from '../pipes/paginationc.pipe';

import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { ViewPostComponent } from './view-post/view-post.component';
import { CustomMatPaginatorIntl } from './paginator-es';

@NgModule({
  declarations: [HomeComponent, UpdateInfoComponent, ViewPostComponent, PaginationPipe],
  exports: [],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass : CustomMatPaginatorIntl
    }
  ]
})
export class CompanyModule { }
