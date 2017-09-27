import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, MenuController } from 'ionic-angular';
import * as moment from 'moment'
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { EventModalPage } from '../event-modal/event-modal'
import { ApptStartPage } from '../appt-start/appt-start'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-appt',
  templateUrl: 'appt.html'
})
export class ApptPage {

  eventSource = [];
  current = [];
  viewTitle: string;
  selectedDay = new Date()

  calendar ={
    mode: 'day',
    allDay: false,
    currentDate: this.selectedDay
  }

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public storage: Storage,
    public service: HttpServiceProvider
  ) { }

  dayView(){
    this.calendar ={
    mode: 'day',
    allDay: false,
    currentDate: this.selectedDay
  }

  }
  monthView(){
    this.calendar ={
    mode: 'month',
    allDay: false,
    currentDate: this.selectedDay
  }
  }

  addEvent(){
    let modal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay})
    modal.present()

    modal.onDidDismiss(data =>{
      if(data){
         this.current.push(
            {
              'Notes': data.notes,
              'Title': data.title,
              'startTime': moment(data.startTime).format('LLLL'),
              'endTime': moment(data.endTime).format('LLLL')
            })

        let eventData = data;
        eventData.startTime = new Date(data.startTime)
        eventData.endTime = new Date(data.endTime)

        let events = this.eventSource
        events.push(eventData)
        this.eventSource = []

        setTimeout(()=>{
          this.eventSource = events
          // console.log('event source',this.eventSource);
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

  apptStartModal(event) {
    let modal = this.modalCtrl.create(ApptStartPage, {event: event});
    modal.present();
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
    
              let first = x.start_time.split('T')[0]
              let last = x.start_time.split('T')[1].replace('T','')
              let year = first.split('-')[0]
              let month = first.split('-')[1]
              let day = first.split('-')[2]
              let hour = last.split(':')[0]
              let min = last.split(':')[1].replace(':','')
              let d = new Date()
              d.setFullYear(year,month-1,day);
              d.setHours(hour)
              d.setMinutes(min)
    
              events.push({
                title: x.c_first,
                notes: x.service,
                startTime : d,
                endTime : d
              })
              this.current.push({
                  'Title': x.c_first,
                  'Notes': x.service,
                  'startTime' : moment(d).format('LLLL'),
                  'endTime' : moment(d).format('LLLL')
                })
              
            })
            this.eventSource = events
          })
        })
      } 

}
