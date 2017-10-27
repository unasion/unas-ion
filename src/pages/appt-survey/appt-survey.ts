import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App, LoadingController } from 'ionic-angular';
// import { Ionic2RatingModule } from 'ionic2-rating';
// import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ApptSurveyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-appt-survey',
  templateUrl: 'appt-survey.html',
})
export class ApptSurveyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public appCtrl: App, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApptSurveyPage');
  }

  cancel() {
    this.viewCtrl.dismiss()
  }
  survey = 'survey done'

  pushPage() {
      this.presentLoading()
      this.navCtrl.popAll()
      // this.navCtrl.pop();
      // this.navCtrl.pop();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Finishing appointment, please wait...",
      duration: 2000
    });
    loader.present();
  }

}
