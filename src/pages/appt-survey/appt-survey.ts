import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from "../../providers/http-service/http-service"



@Component({
  selector: 'page-appt-survey',
  templateUrl: 'appt-survey.html',
})
export class ApptSurveyPage {



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public appCtrl: App,
    public loadingCtrl: LoadingController,
    private service: HttpServiceProvider) {
      this.event = this.navParams.get('event')
  }

  event: any;
  onTime:boolean;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApptSurveyPage');
  }

  cancel() {
    this.viewCtrl.dismiss()
  }
  survey = 'survey done'

  pushPage(tip, rating) {
    let survey = {
      a_id: this.event.a_id,
      onTime: this.onTime,
      tip: Number(tip),
      rating: rating
    }

    console.log('survey', survey)
      this.service.submitSurvey(survey).subscribe()
      this.service.endAppt({"a_id":this.event.a_id}).subscribe(data => {
        data[1] = 'deleted'
        this.viewCtrl.dismiss(data)
      })
      this.presentLoading()
  
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Finishing appointment, please wait...",
      duration: 1000
    });
    loader.present();
  }

}
