import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment'


@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  event = {
    title: '',
    notes: '',
    startTime : new Date().toISOString(),
    endTime : new Date().toISOString()
  }
  minDate = new Date().toISOString()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format()
    this.event.startTime = preselectedDate
    this.event.endTime = preselectedDate
  }

  save(){
    this.viewCtrl.dismiss(this.event)
  }

  cancel(){
    this.viewCtrl.dismiss()
  }



}
