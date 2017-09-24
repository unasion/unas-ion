import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { AuthService } from '../../providers/authservice/authservice'
import { LoginPopOverPage } from '../login-pop-over/login-pop-over'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthService,
    public popoverCtrl: PopoverController
  ) {

  }


  goHome(){
    let popover = this.popoverCtrl.create(LoginPopOverPage, { cssClass: 'login-pop-all'});
      popover.present();

      popover.onDidDismiss(data =>{
        console.log('data from popup', data);
        if(data){
          this.navCtrl.push(TabsPage)
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
