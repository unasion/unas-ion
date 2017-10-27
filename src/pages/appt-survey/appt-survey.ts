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

  pushPage() {
      this.presentLoading()
      this.navCtrl.popToRoot();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Finishing appointment, please wait...",
      duration: 1000
    });
    loader.present();
  }

}
