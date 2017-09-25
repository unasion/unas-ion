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
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { TimerPage } from '../pages/timer/timer';
import { TimerComponent } from '../components/timer/timer';
import { ApptSurveyPage } from '../pages/appt-survey/appt-survey';
import { Ionic2RatingModule } from 'ionic2-rating';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


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
    EditApptModalPage,
    TimerPage,
    TimerComponent,
    ApptSurveyPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    Ionic2RatingModule
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
    EditApptModalPage,
    TimerPage,
    ApptSurveyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    HttpServiceProvider
  ]
})
export class AppModule {}
