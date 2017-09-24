import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'


@IonicPage()
@Component({
  selector: 'page-login-pop-over',
  templateUrl: 'login-pop-over.html',
})
export class LoginPopOverPage {

  userData = {
    'firstName': '',
    'lastName': '',
    'userName': '',
    'password': ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {

  }

  cancel(){
    this.viewCtrl.dismiss()
  }

  login(){
    this.viewCtrl.dismiss(this.userData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPopOverPage');
  }

}
