import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpServiceProvider {

  constructor(public http: Http) {
    console.log('Hello HttpServiceProvider Provider');
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

  addUser(data) {
    console.log('adding user', data)
    return this.http.post('/api/add-user', data)
      .map(res => res.json())
  }

  login(data) {
    console.log('logging in', data)
    return this.http.post('/api/login', data)
      .map(res => res.json())
  }

  getAppts(id) {
    console.log('service',id)
    return this.http.post('/api/appts', id)
      .map(res => res.json())
  }

  addEvent(data) {
    console.log('adding appt')
    return this.http.post('api/add-appt', data)
      .map(res => res.json());
  }
}
