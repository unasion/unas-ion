import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { AuthService } from '../../providers/authservice/authservice'
import { LoginPopOverPage } from '../login-pop-over/login-pop-over';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { LoginModalPage } from '../login-modal/login-modal';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public service: HttpServiceProvider,
    private storage: Storage
  ) {

  }


  goHome(){
    let loginModal = this.modalCtrl.create(LoginModalPage);
    loginModal.present();

      loginModal.onDidDismiss(data =>{
        if(data){
          console.log('data from popup', data[0].b_id);
          this.storage.set('user', data[0]);
          this.navCtrl.push(TabsPage, data[0].b_id)
        }
        else{
          this.navCtrl.popToRoot();
        }

      })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
