import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { ViewPostComponent } from './view-post/view-post.component'
// import { InformationComponent } from '../employee/information/information.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'update-info', component:UpdateInfoComponent},
  {path: 'post/:id', component: ViewPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
