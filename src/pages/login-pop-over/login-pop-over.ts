import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


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
    'password': '',
    'phonenumber': ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public service: HttpServiceProvider,
    public alertCtrl: AlertController
  ) {

  }

  cancel(){
    this.viewCtrl.dismiss()
  }

  signUp() {
    this.service.addBarber(this.userData).subscribe((data) => {
      if (!data.fail) {
        this.viewCtrl.dismiss(data);
      } else {
        this.alertCtrl.create({
          title: data.fail,
          buttons: ['OK']
        }).present()
      }
    })
  }

  login(){
    this.service.login(this.userData).subscribe((data) => {
      if (data.length === 1) {
        this.viewCtrl.dismiss(data);
      } else {
        this.alertCtrl.create({
          title: "Username or password is invalid!",
          buttons: ['OK']
        }).present()
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPopOverPage');
  }

}
