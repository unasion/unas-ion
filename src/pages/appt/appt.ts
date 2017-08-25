import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment'
import { EventModalPage } from '../event-modal/event-modal'


@Component({
  selector: 'page-appt',
  templateUrl: 'appt.html'
})
export class ApptPage {

  eventSource = [];
  current = [
    {
    'startTime': moment(new Date()).format('LLLL'),
    'endTime': moment(new Date()).format('LLLL'),
    'Title': 'Today'
  }
  ];
  viewTitle: string;
  selectedDay = new Date()

  calendar ={
    mode: 'day',
    currentDate: this.selectedDay
  }

  constructor(
    public navCtrl: NavController, 
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {

  }

  weekView(){
    this.calendar ={
    mode: 'week',
    currentDate: this.selectedDay
  }

  }
  dayView(){
    this.calendar ={
    mode: 'day',
    currentDate: this.selectedDay
  }

  }
  monthView(){
    this.calendar ={
    mode: 'month',
    currentDate: this.selectedDay
  }
  }

  addEvent(){
    let modal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay})
    modal.present()

    modal.onDidDismiss(data =>{
      if(data){
        let eventData = data;

        eventData.startTime = new Date(data.startTime)
        eventData.endTime = new Date(data.endTime)

        let events = this.eventSource
        events.push(eventData)

        this.current.push(
            {
              'startTime': moment(eventData.startTime).format('LLLL'),
              'endTime': moment(eventData.endTime).format('LLLL'),
              'Title': eventData.title
            })
        this.eventSource = []
        setTimeout(()=>{
          this.eventSource = events
        })
        return this.current
      }
    })
  }

  onViewTitleChanged(title){
    this.viewTitle = title
  }

  onTimeSelected(ev){
    this.selectedDay = ev.selectedTime
  }

  onEventSelected(event){
    let start = moment(event.startTime).format('LLLL')
    let end = moment(event.endTime).format('LLLL')

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present()
  }

}
