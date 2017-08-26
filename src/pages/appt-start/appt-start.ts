import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-appt-start',
  templateUrl: 'appt-start.html',
})
export class ApptStartPage {

  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {

    this.navParams.get('event')
    this.event = this.navParams.get('event')
  }

  cancel(){
    this.viewCtrl.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApptStartPage');
  }

}
