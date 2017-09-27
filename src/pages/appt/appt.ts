import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, MenuController, NavParams } from 'ionic-angular';
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
  selectedDay = new Date();
  mode = 'day';
  saved: any;

  calendar ={
    mode: 'month',
    allDay: false,
    currentDate: this.selectedDay,
    loadEvents: function() {
      return this.eventSource
    }
  }

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public storage: Storage,
    public service: HttpServiceProvider,
    public navParams: NavParams
  ) {
     this.saved = this.navParams.get('saved')
     console.log('-- save --',this.saved)
   }

  addEvent(){
    let modal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay})
    modal.present()

    modal.onDidDismiss(data =>{
      if(data){
         this.current.push(
            {
              'notes': data.notes,
              'title': data.title,
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
    modal.onDidDismiss(data =>{
      console.log('-- data on dismiss --',data);
      if(data[1] == 'yes'){
        var ready = 'no';
        console.log('-----yes------yes-----');
        let editAppt = data[0]
        let editcAppt = data[0]
        console.log('before >>>>>', editcAppt.startTime);
        editcAppt.startTime = moment(editcAppt.startTime).format('LLLL').toString()
        editcAppt.endTime = moment(editcAppt.endTime).format('LLLL').toString()
        for (var y = 0; y < this.current.length; y++) {
          if(this.current[y].a_id == editcAppt.a_id){
            console.log('after >>>>>', editcAppt.startTime);
            console.log('editcAppt',editcAppt);
            this.current[y] = {
              'a_id': editcAppt.a_id,
              'title': editcAppt.title,
              'notes': editcAppt.notes,
              'startTime' : moment(editcAppt.startTime).format('LLLL').toString(),
              'endTime' : moment(editcAppt.startTime).format('LLLL').toString()
            }
          }
        }
        let events = this.eventSource
        for (var k = 0; k < events.length; k++) {
          if(events[k].a_id == editAppt.a_id){
            editAppt.startTime = new Date(editAppt.startTime)
            editAppt.endTime = new Date(editAppt.endTime)
            events[k] = editAppt
            ready = 'yes'
          }
        }
        if(ready == 'yes'){
          this.eventSource = []
          setTimeout(()=>{
            this.eventSource = events
            })
        }
      }
      if(data[1]=='deleted'){
        console.log('-----deleted------deleted-----');
        for (var i = 0; i < this.current.length; i++) {
          if(this.current[i].a_id == data[0].a_id){
          this.current.splice(i,1);
          }
        }
      let events = this.eventSource
        for (var j = 0; j < events.length; j++) {
          var go = false
          // console.log('log condition in delete', events[j].a_id,'===',data.a_id);
          if(events[j].a_id == data[0].a_id){
          events.splice(j,1);
          // console.log('in first if---',events,this.eventSource);
          go = true
          }
        }
        if(go==true){
          this.eventSource = []
          setTimeout(()=>{
            this.eventSource = events
            })
          // console.log('in second if---',events,this.eventSource);
        }
        // console.log('leving delete fun---',events,this.eventSource);
        return this.eventSource, this.current
      }
    })
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
                a_id: x.a_id,
                title: x.c_first,
                notes: x.service,
                startTime : d,
                endTime : d
              })
              this.current.push({
                  'a_id': x.a_id,
                  'title': x.c_first,
                  'notes': x.service,
                  'startTime' : moment(d).format('LLLL'),
                  'endTime' : moment(d).format('LLLL')
                })
              
            })
            this.eventSource = events
            console.log('this.eventSource',this.eventSource);
            
          })
        })
      }
      
      ionViewDidEnter() {
        console.log('-- is event edited? --',this.current);
        
      }

}
