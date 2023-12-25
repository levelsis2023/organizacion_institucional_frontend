import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
// #fake-start#
import { NoticyAlertComponent } from './componets/notifications/noticy-alert/noticy-alert.component';
// #fake-end#
import { InlineSVGModule } from 'ng-inline-svg-2';
import { httpInterceptorProviders } from './core/http';


@NgModule({
  declarations: [AppComponent,NoticyAlertComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  exports: [
    NoticyAlertComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
