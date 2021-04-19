import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { SliderComponent } from './componentes/slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterLinksComponent } from './componentes/footer-links/footer-links.component';
/**/
import { AuthenticationGuard } from './authentication.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VerifyaccountComponent } from './componentes/verifyaccount/verifyaccount.component';
//import { EnterpriseComponent } from './enterprise/enterprise.component';

import { ChatComponent } from './componentes/chat/chat.component';
import { ModifyImagePipe } from './pipes/modify-image.pipe';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NotFoundComponent } from './componentes/not-found/not-found.component'
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    FooterLinksComponent,
    VerifyaccountComponent,
    ChatComponent,
    ModifyImagePipe,
    //EnterpriseComponent
    ChatComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    AuthenticationGuard,
    {provide: LOCALE_ID, useValue : 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

