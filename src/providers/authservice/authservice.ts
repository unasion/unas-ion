import { Injectable, NgZone } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';
// import { NavController } from 'ionic-angular';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';
// import { HomePage } from '../../pages/home/home'

const auth0Config = {
  // needed for auth0
  clientID: 'dQBbTjHyKT_VcOLxZ2tNCYTy7Gd5Pkyx',

  // needed for auth0cordova
  clientId: 'dQBbTjHyKT_VcOLxZ2tNCYTy7Gd5Pkyx',
  domain: 'penguinhousedesigns.auth0.com',
  callbackURL: location.href,
  // redirectUri: HomePage,
  packageIdentifier: 'com.ionicframework.unasion'
};

@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  constructor(public zone: NgZone) {
    this.user = this.getStorageVariable('profile');
    this.idToken = this.getStorageVariable('id_token');
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    console.log('isAuthenticated called');
    // this.navCtrl.push(HomePage)
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public login() {
    console.log('login called');
    
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, (err, authResult) => {
      if(err) {
        throw err;
      }

      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);

      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.setStorageVariable('expires_at', expiresAt);
      this.isAuthenticated()

      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if(err) {
          throw err;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.setStorageVariable('profile', profile);
        this.zone.run(() => {
          this.user = profile;
        });
      });
    });
  }

  public logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;
  }

}
