import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login'
import Auth0Cordova from '@auth0/cordova';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import * as moment from 'moment';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController
  rootPage: any = LoginPage
  secondPage: any = TabsPage
  show: boolean = true;
  public time: any;
  public profile: any;
  public timecard = {
    timeIn: {},
    timeOut: {},
    id: NaN,
    shopId: NaN,
    isUser: false
  };
  clockIn: boolean;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    public service: HttpServiceProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };

    });


    storage.get('user').then((user) => {
      if(user){
        this.profile = user
      }
    })
  }

  logout(){
    console.log('-- we logging out ---');
    this.storage.remove('user');
    this.storage.remove('contacts');
    this.storage.remove('services');
    this.nav.popToRoot();
  }

  timeStamp() {
    if (this.clockIn) {
      this.timecard.timeIn = moment(new Date()).format('YYYY-MM-DD HH:mm:ss z');
    }
    else if (!this.clockIn) {
      this.timecard.timeOut = moment(new Date()).format('YYYY-MM-DD HH:mm:ss z');
      this.timecard.id = this.profile.b_id;
      this.timecard.shopId = this.profile.shop
      this.service.postTimecards(this.timecard).subscribe((data) => {
        console.log('sending timecard to service')
      })
    }
    this.show = !this.show
    console.log('clock in:', this.timecard.timeIn)
    console.log('clock out:', this.timecard.timeOut)
  }
}
