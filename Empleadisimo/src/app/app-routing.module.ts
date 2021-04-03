import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { FooterLinksComponent } from './componentes/footer-links/footer-links.component'
/*import { UpdateInfoComponent } from './componentes/update-info/update-info.component'*/
<<<<<<< HEAD
//import {  } from "module";

=======
import { ChatComponent } from './componentes/chat/chat.component'
>>>>>>> cb943087f7ab05be73812417a6085df4a0e64870
import { AuthenticationGuard } from './authentication.guard'
import { VerifyaccountComponent } from './componentes/verifyaccount/verifyaccount.component';
//import { EnterpriseComponent } from "./enterprise/enterprise.component";

const routes: Routes = [
  { path: 'footer/:id' ,component: FooterLinksComponent },
  { path: '', component:LandingPageComponent },
  { path: 'chat', component: ChatComponent},
  /*{ path: 'update-info', component: UpdateInfoComponent },*/
<<<<<<< HEAD
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m =>m.EmployeeModule), canActivate:[AuthenticationGuard] },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m =>m.CompanyModule), canActivate:[AuthenticationGuard] },
  { path: 'verifyaccount/:token/:id', component: VerifyaccountComponent }/*,
  {path: 'publicaciones/:id', component: EnterpriseComponent}*/
=======
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m =>m.EmployeeModule), canActivate:[AuthenticationGuard], data:{role: 'employee'} },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m =>m.CompanyModule), canActivate:[AuthenticationGuard], data:{role: 'company'} },
  { path: 'admin', loadChildren: ()=> import ('./admin/admin.module').then(m => m.AdminModule), canActivate:[AuthenticationGuard], data:{role: 'admin'}},
  { path: 'verifyaccount/:token/:id', component: VerifyaccountComponent }
>>>>>>> cb943087f7ab05be73812417a6085df4a0e64870
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
