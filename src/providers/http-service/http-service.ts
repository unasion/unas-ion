import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
// import * as io from "socket.io-client";


@Injectable()
export class HttpServiceProvider {

  user_id: any;
  contacts: any;
  services: any;
  myIP = 'http://10.0.0.98:4200'

  constructor(
    public http: Http,
    store: Storage
  ) {
    store.get('user').then((x)=> {
      if(x){
        this.user_id = x.b_id
      }
    })
    store.get('contacts').then((x)=> {
      if(x){
        this.contacts = x
      }
    })
    store.get('services').then((x)=> {
      if(x){
        this.services = x
      }
    })
  }


  getBarbers(id) {
    console.log('service')
    return this.http.post(`${this.myIP}/api/barbers`, id)
    .map(res => res.json())
  }

  getServices(id) {
    console.log('service')
    return this.http.post(`${this.myIP}/api/services`, id)
    .map(res => res.json())
  }

  getContacts(id:any) {
    return this.http.post(`${this.myIP}/api/contacts`, id)
      .map(res => res.json())
  }

  addBarber(data) {
    console.log('-- adding user in service --', data)
    return this.http.post(`${this.myIP}/api/add-barber`, data)
      .map(res => res.json())
  }

  postTimecards(data) {
    console.log('-- adding timecards to service --', data)
    return this.http.post(`${this.myIP}/api/post-timecards`, data)
      .map(res => res.json())
  }

  login(data) {
    return this.http.post(`${this.myIP}/api/ionic-login`, data)
      .map(res => {
        return res.json()
      })
  }

  getAppts(id) {
    console.log('--- hitting service to get appts ---',id)
    return this.http.post(`${this.myIP}/api/appts`, id)
      .map(res => {
        console.log('back from db appts 😤', res.json());
        return res.json()
      })
  }

  cancelAppt(ids){
    console.log('-- ids in service to delete --',ids);
    return this.http.post(`${this.myIP}/api/delete-request`, ids)
      .map(res => res.json())
  }

  editAppt(data){
    console.log('-- edit appt in service --',data);
    return this.http.post(`${this.myIP}/api/cal/edit`,data)
      .map(res => res.json())
  }

  startAppt(data){
    console.log('starting appt in service', data)
    return this.http.post(`${this.myIP}/api/start-appt`, data)
      .map(res => res.json())
  }

  endAppt(data){
    console.log('finishing appt in service', data)
    return this.http.post(`${this.myIP}/api/end-appt`, data)
      .map(res => res.json())
  }

  addEvent(data) {
    let v_id = 0
    let c_id = 0
    console.log('-- adding appt in service --', data.title.split(' ')[0])
    this.contacts.filter((x)=>{
        if(data.title.split(' ')[0] == x.c_first){
          console.log('x.c_id',x.c_id);
          c_id = x.c_id
          return
        }
    })
    this.services.filter((x)=>{
      if(data.notes == x.service){
        console.log('x.v_id',x.v_id);
        v_id = x.v_id
        return
      }
    })
    let event = {
      'barber_id': Number(this.user_id),
      'client_id': c_id,
      'service_id': v_id,
      'shop_id': 1,
      'start_time': moment(new Date(data.startTime)).format('YYYY-MM-DD HH:mm:ss z'),
      'end_time': moment(new Date(data.endTime)).format('YYYY-MM-DD HH:mm:ss z')
    }
    console.log('-- event going to DB --',event);

    return this.http.post(`${this.myIP}/api/add-appt`, event)
      .map(res => res.json());
  }

}
