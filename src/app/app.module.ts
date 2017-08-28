import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgCalendarModule } from 'ionic2-calendar'
import { ApptPage } from '../pages/appt/appt';
import { StatsPage } from '../pages/stats/stats';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { EventModalPage } from '../pages/event-modal/event-modal'
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApptStartPage } from '../pages/appt-start/appt-start';
import { EditApptModalPage } from '../pages/edit-appt-modal/edit-appt-modal';
import { AuthService } from '../providers/authservice/authservice';

@NgModule({
  declarations: [
    MyApp,
    ApptPage,
    StatsPage,
    HomePage,
    TabsPage,
    LoginPage,
    EventModalPage,
    ApptStartPage,
    EditApptModalPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ApptPage,
    StatsPage,
    HomePage,
    TabsPage,
    LoginPage,
    EventModalPage,
    ApptStartPage,
    EditApptModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
