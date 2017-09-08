import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { EditApptModalPage } from '../edit-appt-modal/edit-appt-modal';
import { TimerPage } from '../timer/timer';
// import { TimerComponent } from '../../components/timer/timer';


@Component({
  selector: 'page-appt-start',
  templateUrl: 'appt-start.html',
})
export class ApptStartPage {

  @ViewChild(TimerPage) timer: TimerPage;

  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private modalCtrl: ModalController) {

    this.navParams.get('event')
    this.event = this.navParams.get('event')
  }

  cancel(){
    this.viewCtrl.dismiss()
  }

  editApptModal() {
    let modal = this.modalCtrl.create(EditApptModalPage);
    modal.present();
  }

  timerModal() {
    let modal = this.modalCtrl.create(TimerPage);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApptStartPage');
  }

}
