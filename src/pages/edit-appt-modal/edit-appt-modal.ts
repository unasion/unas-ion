import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditApptModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-appt-modal',
  templateUrl: 'edit-appt-modal.html',
})
export class EditApptModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  cancel(){
    this.viewCtrl.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditApptModalPage');
  }

}
