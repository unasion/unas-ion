import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, MenuController } from 'ionic-angular';
import * as moment from 'moment'
import { EventModalPage } from '../event-modal/event-modal';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any;
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
    public menuCtrl: MenuController,
    private storage: Storage,
    public service: HttpServiceProvider,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {

    console.log('home loaded')
    this.service.getContacts({id:1}).subscribe((data) => {
      this.storage.set('contacts', data)
    })
    this.service.getServices({id:1}).subscribe((data) => {
      this.storage.set('services', data)
    })
    this.storage.get('user').then((user)=> {
      console.log(user)
      this.service.getAppts({id:user.b_id}).subscribe((data)=> {
        console.log('-- appts from DB --',data);
        console.log('new date', new Date(data[0].start_time) )
        console.log('new date', moment(data[0].start_time).hour(4).minute(48).format('ddd MMM D YYYY hh:mm:ss zz') )
        // 2017-10-02T09:05:52.000Z
        
        let events = []
        data.map((x)=> {

          events.push({
            title: x.c_first,
            notes: x.service,
            startTime : new Date(x.start_time),
            endTime : new Date(x.end_time)
            // Fri Sep 29 2017 07:47:33 GMT-0600 (MDT)
          })
        })
        this.eventSource = events
      })
    })
  } 

  addEvent(){
    let modal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay})
    modal.present()

    modal.onDidDismiss(data =>{
      if(data){
        console.log('-- modal data --',data);
        let eventData = data;

        eventData.startTime = new Date(data.startTime)
        eventData.endTime = new Date(data.endTime)

        let events = this.eventSource
        events.push(eventData)
        this.eventSource = []
        setTimeout(()=>{
          this.eventSource = events
        })
        console.log('this.eventSource',this.eventSource);
      
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
