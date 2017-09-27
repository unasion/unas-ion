import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


@Component({
  selector: 'page-edit-appt-modal',
  templateUrl: 'edit-appt-modal.html',
})
export class EditApptModalPage {
  minDate = new Date().toISOString()
  event: any;
  contacts: any;
  services: any;
  user: any;
  saved: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    public storage: Storage,
    public service: HttpServiceProvider
  ) {
    this.navParams.get('event')
    this.event = this.navParams.get('event')
  }

  // UPDATE appointments
  // SET barber_id = $2, client_id = $3, service_id = $4, shop_id = $5, start_time = $6, end_time = $7
  // WHERE a_id = $1 

  save(){
    this.saved = 'yes';
    var c_id;
    var v_id;
    console.log('-- new event --',this.event);
    this.contacts.filter((x)=>{
      if(x.c_first == this.event.title.split(' ')[0]){
        c_id = x.c_id
      }
    })
    this.services.filter((x)=>{
      if(x.service == this.event.notes){
        v_id = x.v_id
      }
    })
    let edit = {
      'a_id': this.event.a_id,
      'b_id': this.user.b_id,
      'c_id': c_id,
      'v_id': v_id,
      'shop_id': 1,
      'start_time': moment(this.event.startTime).format('YYYY-MM-DD HH:mm:ss'),
      'end_time': moment(this.event.endTime).format('YYYY-MM-DD HH:mm:ss')
    }
    this.service.editAppt(edit).subscribe()
    let dataBack =[
      this.event,this.saved
    ]
    this.viewCtrl.dismiss(dataBack)
  }

  cancel(){
    this.saved = 'no'
    let dataBack =[
      this.event,this.saved
    ]
    this.viewCtrl.dismiss(dataBack)
  }

  ionViewDidEnter() {
    this.event.startTime = new Date(this.event.startTime).toISOString()
    this.event.endTime = new Date(this.event.endTime).toISOString()
    
    this.storage.get('contacts').then((x)=> {
      this.contacts = x
          })
    this.storage.get('services').then((x)=> {
      this.services = x
          })
    this.storage.get('user').then((x)=> {
      this.user = x
          })

  }

  ionViewDidLeave(){
    this.event.startTime = moment(this.event.startTime).format('LLLL')
    this.event.endTime = moment(this.event.endTime).format('LLLL')
  }

}
