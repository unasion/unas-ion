import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, MenuController } from 'ionic-angular';
import * as moment from 'moment'
import { EventModalPage } from '../event-modal/event-modal'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  home = HomePage;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date()

  calendar ={
    mode: 'month',
    currentDate: this.selectedDay
  }

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController
  ) {

  }

  addEvent(){
    let modal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay})
    modal.present()

    modal.onDidDismiss(data =>{
      if(data){
        console.log(data);
        let eventData = data;

        eventData.startTime = new Date(data.startTime)
        eventData.endTime = new Date(data.endTime)

        let events = this.eventSource
        events.push(eventData)
        this.eventSource = []
        setTimeout(()=>{
          this.eventSource = events
        })

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

  openMenu() {
   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }

}
