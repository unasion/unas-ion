import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { TimerComponent } from '../../components/timer/timer';
import { ApptSurveyPage } from '../appt-survey/appt-survey';
import { HttpServiceProvider } from "../../providers/http-service/http-service"


@Component({
    selector: 'timer-page',
    templateUrl: 'timer.html'
})
export class TimerPage {

  event: any;

  @ViewChild(TimerComponent) timer: TimerComponent;



    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private service: HttpServiceProvider
    ) {
      this.event = this.navParams.get('event')
    }

    cancel(){
      this.viewCtrl.dismiss()
    }

    surveyModal(){

      this.timer.apptTime()

      let apptObj = {
        a_id: this.event.a_id,
        time: this.timer.apptTimer
      }
      
      console.log(apptObj)
      this.service.saveApptTime(apptObj).subscribe()
      let modal = this.modalCtrl.create(ApptSurveyPage,  {event: this.event});
      modal.present();
      modal.onDidDismiss(data => {
        this.viewCtrl.dismiss(data)
      })

    }

}
