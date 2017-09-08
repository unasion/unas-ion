import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { TimerComponent } from '../../components/timer/timer';
import { ApptSurveyPage } from '../appt-survey/appt-survey'


@Component({
    selector: 'timer-page',
    templateUrl: 'timer.html'
})
export class TimerPage {

  @ViewChild(TimerComponent) timer: TimerComponent;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private modalCtrl: ModalController) {
    }

    cancel(){
      this.viewCtrl.dismiss()
    }

    surveyModal(){
      let modal = this.modalCtrl.create(ApptSurveyPage);
      modal.present();
    }

}
