import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the LoginModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {
  userData = {
    'firstName': '',
    'lastName': '',
    'userName': '',
    'password': ''
  }

  show: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public service: HttpServiceProvider, public alertCtrl: AlertController) {
  }

  newUser(){
    this.show = !this.show;
  }

  login(){
    this.service.login(this.userData).subscribe((data) => {
      console.log('login model 😡',data);
      if (data[0].b_id) {
        this.viewCtrl.dismiss(data);
      } else {
        this.alertCtrl.create({
          title: "Username or password is invalid!",
          buttons: ['OK']
        }).present()
      }
    })
  }

  signUp() {
    console.log('-- this.userData --', this.userData)
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginModalPage');
  }

  cancel() {
    this.viewCtrl.dismiss()
  }

}
