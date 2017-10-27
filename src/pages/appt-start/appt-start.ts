import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { EditApptModalPage } from '../edit-appt-modal/edit-appt-modal';
import { TimerPage } from '../timer/timer';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
// import { TimerComponent } from '../../components/timer/timer';


@Component({
  selector: 'page-appt-start',
  templateUrl: 'appt-start.html',
})
export class ApptStartPage {

  @ViewChild(TimerPage) timer: TimerPage;

  event: any;
  saved: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    public service: HttpServiceProvider,
    private toastCtrl: ToastController
  ) {
    this.saved = this.navParams.get('saved')
    console.log('-- save --',this.saved);
    this.navParams.get('event')
    this.event = this.navParams.get('event')
    console.log('-- this.event --',this.event);
  }

  cancelAppt(){
    let ids = {
      'a_id': this.event.a_id,
      'shop_id': 1
    }
    console.log('-- canceled appts ids --',ids);

    this.service.cancelAppt(ids).subscribe()
    let toast = this.toastCtrl.create({
      message: 'Appointment Delete Successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    let dataBack = [
      this.event,
      'deleted'
    ]
    this.viewCtrl.dismiss(dataBack)
  }

  back(){
    let dataBack = [
      this.event,
      this.saved
    ]
    this.viewCtrl.dismiss(dataBack)
  }

  editApptModal() {
    let modal = this.modalCtrl.create(EditApptModalPage, {event: this.event});
    modal.present();
    modal.onDidDismiss((data)=>{
      this.event = data[0]
      this.saved = data[1]
      console.log('--- data from edit modal ----',data);
    })
  }

  timerModal() {
    let modal = this.modalCtrl.create(TimerPage, {event: this.event});
    modal.present();
    modal.onDidDismiss(data => {
      this.viewCtrl.dismiss(data)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApptStartPage');
  }

}
