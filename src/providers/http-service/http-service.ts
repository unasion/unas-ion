import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';


@Injectable()
export class HttpServiceProvider {

  user_id: any;
  contacts: any;
  services: any;

  constructor(
    public http: Http,
    private store: Storage
  ) {
    store.get('user').then((x)=> {
      this.user_id = x.b_id
    })
    store.get('contacts').then((x)=> {
      this.contacts = x
    })
    store.get('services').then((x)=> {
      this.services = x
    })
  }
  

  testPoint() {
    return this.http.get('/api/test')
      .map(res => res.json());
  }

  getBarbers(id) {
    console.log('service')
    return this.http.post('/api/barbers', id)
    .map(res => res.json())
  }

  getServices(id) {
    console.log('service')
    return this.http.post('/api/services', id)
    .map(res => res.json())
  }

  getContacts(id:any) {
    return this.http.post('/api/contacts', id)
      .map(res => res.json())
  }

  addBarber(data) {
    console.log('adding user', data)
    return this.http.post('/api/add-barber', data)
      .map(res => res.json())
  }

  login(data) {
    console.log('logging in', data)
    return this.http.post('/api/login', data)
      .map(res => res.json())
  }

  getAppts(id) {
    console.log('--- hitting service to get appts ---',id)
    return this.http.post('/api/appts', id)
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
      'b_id': Number(this.user_id),
      'c_id': c_id,
      'v_id': v_id,
      'shop_id': 1,
      'start_time': moment(new Date(data.startTime)).format('YYYY-MM-DD HH:mm:ss z'),
      'end_time': moment(new Date(data.endTime)).format('YYYY-MM-DD HH:mm:ss z')
    }
    console.log('-- event going to DB --',event);
    
    return this.http.post('/api/add-appt', event)
      .map(res => res.json());
  }

}
