import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import * as moment from 'moment'
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { EventModalPage } from '../event-modal/event-modal'
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any;
  home = HomePage;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  totalTips: any;
  totalWages: any;
  cutTime = {
    'time': '00:00:00',
    'a_ids' : [0]
  };
  upcoming = 0;

  calendar ={
    mode: 'month',
    currentDate: this.selectedDay
  }

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    private storage: Storage,
    public service: HttpServiceProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.doRefresh(0);
  }

  ionViewDidEnter() {

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
        console.log('-- Appts coming from DB --',data);

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

        })
        this.eventSource = events
      })
      
      let earninfo = {
        'id' : user.b_id,
        'date1': moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD'),
        'date2':  moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')
      }
      this.service.getBarberStats(earninfo).subscribe((stats) => {
        console.log('barber stats here', stats);

        let barberStats = [];
        let barberTips = [];
        let barberWages = [];
        this.cutTime.time = '00:00:00'
        this.upcoming = 0
        
        stats.map((x) => {
          //  console.log('x.status',x.status);
          if (x.tip !== null){
            let floatedValue1 = parseFloat(x.tip.replace(/[^\d\.]/, ''));
            barberTips.push(floatedValue1)
          }
          if (x.total !== null){
            let floatedValue2 = parseFloat(x.total.replace(/[^\d\.]/, ''));
            barberWages.push(floatedValue2)
          }

          if (x.appt_length !== null &&  x.status == 'completed' ){
                console.log('inside for loop ify');
                var hour = Number(x.appt_length.split(':')[0])
                var min = Number(x.appt_length.split(':')[1])
                var sec = Number(x.appt_length.split(':')[2])        
                this.cutTime.time = moment().hour(Number(this.cutTime.time.split(':')[0])).minute(Number(this.cutTime.time.split(':')[1])).second(Number(this.cutTime.time.split(':')[2])).add(hour,'hours').add(min,'minutes').add(sec,'seconds').format("HH:mm:ss")
         }
          
          if (x.status === 'scheduled'){
            this.upcoming = this.upcoming + 1;
          }
          
        })

        let totalTips = 0;
        barberTips.forEach(item => totalTips += parseFloat(item ? item : 0.0));

        let totalWages = 0;
        barberWages.forEach(y => totalWages += parseFloat(y ? y : 0.0));
        // console.log('total tips', totalTips)
        // console.log('total wages', totalWages)
        this.totalTips = totalTips;
        this.totalWages = totalWages;
        
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

 doRefresh(refresher){
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
      console.log('-- Appts coming from DB --',data);

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

      })
      this.eventSource = events
    })
    
    let earninfo = {
      'id' : user.b_id,
      'date1': moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD'),
      'date2':  moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')
    }
    this.service.getBarberStats(earninfo).subscribe((stats) => {
      console.log('barber stats here', stats);

      let barberStats = [];
      let barberTips = [];
      let barberWages = [];
      this.cutTime.time = '00:00:00'
      this.upcoming = 0
      
      stats.map((x) => {
        //  console.log('x.status',x.status);
        if (x.tip !== null){
          let floatedValue1 = parseFloat(x.tip.replace(/[^\d\.]/, ''));
          barberTips.push(floatedValue1)
        }
        if (x.total !== null){
          let floatedValue2 = parseFloat(x.total.replace(/[^\d\.]/, ''));
          barberWages.push(floatedValue2)
        }

        if (x.appt_length !== null &&  x.status == 'completed' ){
              console.log('inside for loop ify');
              var hour = Number(x.appt_length.split(':')[0])
              var min = Number(x.appt_length.split(':')[1])
              var sec = Number(x.appt_length.split(':')[2])        
              this.cutTime.time = moment().hour(Number(this.cutTime.time.split(':')[0])).minute(Number(this.cutTime.time.split(':')[1])).second(Number(this.cutTime.time.split(':')[2])).add(hour,'hours').add(min,'minutes').add(sec,'seconds').format("HH:mm:ss")
       }
        
        if (x.status === 'scheduled'){
          this.upcoming = this.upcoming + 1;
        }
        
      })

      let totalTips = 0;
      barberTips.forEach(item => totalTips += parseFloat(item ? item : 0.0));

      let totalWages = 0;
      barberWages.forEach(y => totalWages += parseFloat(y ? y : 0.0));
      // console.log('total tips', totalTips)
      // console.log('total wages', totalWages)
      this.totalTips = totalTips;
      this.totalWages = totalWages;
      
    })
    
  })
  if(refresher != 0){
    refresher.complete();
  }

 }

}
