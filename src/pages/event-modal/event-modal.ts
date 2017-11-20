import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  event = {
    title: '',
    notes: '',
    startTime : new Date().toISOString(),
    endTime : new Date().toISOString(),
    a_id: NaN
  }
  minDate = new Date().toISOString()
  barbers:any;
  contacts:any;
  services:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public service: HttpServiceProvider,
    private storage: Storage
  ) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format()
    this.event.startTime = preselectedDate
    this.event.endTime = preselectedDate
  }

  ionViewDidLoad() {

    this.storage.get('contacts').then((val)=> {
        this.contacts=val
        console.log(this.contacts)
    })
    this.storage.get('services').then((val)=> {
        this.services=val
        console.log(this.services)
    })

  }

  save(){
    this.service.addEvent(this.event).subscribe(data => {
      this.event.a_id = data[0].a_id
      console.log('data back', data)
      console.log('-- event saved in Modal --', this.event)
      this.viewCtrl.dismiss(this.event);
    })
  }

  cancel(){
    this.viewCtrl.dismiss()
  }



}
