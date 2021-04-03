import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { FooterLinksComponent } from './componentes/footer-links/footer-links.component'
/*import { UpdateInfoComponent } from './componentes/update-info/update-info.component'*/
import { ChatComponent } from './componentes/chat/chat.component'
import { AuthenticationGuard } from './authentication.guard'
import { VerifyaccountComponent } from './componentes/verifyaccount/verifyaccount.component';
//import { EnterpriseComponent } from "./enterprise/enterprise.component";

const routes: Routes = [
  { path: 'footer/:id' ,component: FooterLinksComponent },
  { path: '', component:LandingPageComponent },
  { path: 'chat', component: ChatComponent},
  /*{ path: 'update-info', component: UpdateInfoComponent },*/
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m =>m.EmployeeModule), canActivate:[AuthenticationGuard], data:{role: 'employee'} },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m =>m.CompanyModule), canActivate:[AuthenticationGuard], data:{role: 'company'} },
  { path: 'admin', loadChildren: ()=> import ('./admin/admin.module').then(m => m.AdminModule), canActivate:[AuthenticationGuard], data:{role: 'admin'}},
  { path: 'verifyaccount/:token/:id', component: VerifyaccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
