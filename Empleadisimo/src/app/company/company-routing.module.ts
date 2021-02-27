import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateInfoComponent } from './update-info/update-info.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'update-info', component:UpdateInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
