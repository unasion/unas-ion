import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import * as moment from 'moment';
import { NavController } from 'ionic-angular';

import { ApptPage } from '../appt/appt';
import { StatsPage } from '../stats/stats';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ApptPage;
  tab3Root = StatsPage;
  profile: any;
  show: boolean = true;
  public time: any;
  public timecard = {
    timeIn: {},
    timeOut: {},
    barberId: NaN,
    shopId: NaN
  };
  clockIn: boolean;

  constructor(
    public service : HttpServiceProvider,
    public storage: Storage,
    public navCtrl: NavController
  ) {
    storage.get('user').then((user) => {
      if(user){
        this.profile = user
      }
    })
  }


  logout(){
    console.log('-- we logging out ---');
    this.storage.remove('user')
    this.navCtrl.popToRoot()
  }

  timeStamp() {
    if (this.clockIn) {
      this.timecard.timeIn = moment(new Date()).format('YYYY-MM-DD HH:mm:ss z');
    }
    else if (!this.clockIn) {
      this.timecard.timeOut = moment(new Date()).format('YYYY-MM-DD HH:mm:ss z');
      this.timecard.barberId = this.profile.b_id;
      this.timecard.shopId = this.profile.shop
      this.service.postTimecards(this.timecard).subscribe((data) => {
        console.log('sending timecard to service')
      })
    }
    this.show = !this.show
    console.log('clock in:', this.timecard.timeIn)
    console.log('clock out:', this.timecard.timeOut)
  }



}
