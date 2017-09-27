import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login'
import Auth0Cordova from '@auth0/cordova';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage
  secondPage: any = TabsPage
  show: boolean = true;
  public time: any;
  public timeIn : any;
  public timeOut : any;
  clockIn : boolean;
  profile: any;


  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: Storage
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

    this.time = {
      timeIn : false,
      timeOut : false
    }
    storage.get('user').then((user)=> {
      this.profile = user
    })
  }

  logout(){
    console.log('-- we logging out ---');
    // this.storage.clear()
  }

  timeStamp(){
    if(this.clockIn) {
      this.timeIn = new Date();
    }
    else if(!this.clockIn) {
      this.timeOut = new Date();
    }
    this.show = !this.show
    console.log('clock in:',this.timeIn)
    console.log('clock out:',this.timeOut)
  }
}
