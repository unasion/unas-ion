import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import * as moment from 'moment'
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
  
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('lineCanvas2') lineCanvas2;
    @ViewChild('lineCanvas3') lineCanvas3;
    @ViewChild('barCanvas') barCanvas;
   
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    lineChart2: any;
    lineChart3: any;
    totalTips: any;
    totalWages: any;
    upcoming = 0;
    user:any;

    //temp variables
    doughnutData = [0,0]
    cutTimes=[0,0,0,0,0,0,0]
    barberWages = [0,0,0,0,0,0,0]
    barberTips = [0,0,0,0,0,0,0];
    

    public lineChartData:Array<any> = [0,0,0,0,0,0,0];
    public lineChartData2:Array<any> = [0,0,0,0,0,0,0];
    public lineChartData3:Array<any> = [0,0,0,0,0,0,0];
    public lineChartLabels:Array<any> = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    public lineChartType:string = 'line';

    public doughnutChartLabels:string[] = ['Wages', 'Tips'];
    public doughnutChartData:number[] = [0, 0];
    public doughnutChartType:string = 'doughnut';
 
    constructor(
        public storage: Storage,
        public service: HttpServiceProvider,
        public navCtrl: NavController) {
        // this.doRefresh(0);
    }


    getStats() {
        
    }
 
    ionViewDidEnter() {
        this.doughnutData = [0,0];
        this.cutTimes=[0,0,0,0,0,0,0];
        this.barberWages = [0,0,0,0,0,0,0];
        this.barberTips = [0,0,0,0,0,0,0];
        this.storage.get('user').then(user => {
            
                        let earninfo = {
                                    'id' : user.b_id,
                                    'date1':  moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
                                    'date2': moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')
                                  }
                        this.service.getBarberStats(earninfo).subscribe((stats) => {
                            console.log("the stats", stats);
                            stats.map(x => {
            
                                //earnings doughnut
                                
                                //wages and tips line graph
                                if (x.total !== null){
                                    this.doughnutData[0] = this.doughnutData[0] + Number(x.total.split('$')[1])
                                    x.total = parseFloat(x.total.replace(/[^\d\.]/, ''));
                                }
                                if (x.tip !== null){
                                    this.doughnutData[1] = this.doughnutData[1] + Number(x.tip.split('$')[1])
                                    x.tip = parseFloat(x.tip.replace(/[^\d\.]/, ''));
                                }
                                for (let i = 0; i < this.lineChartLabels.length; i++) {
                                    if(moment(x.start_time).format("ddd") === this.lineChartLabels[i]){
                                        this.barberWages[i] +=  Number(x.total)
                                        this.barberTips[i] += Number(x.tip)
                                    }
                                }
            
                                //time spent cutting data
                                if  (x.appt_length){
                                    x.appt_length = x.appt_length.split(':').map(y=> parseInt(y));
                                    let cutMinutes = x.appt_length[0]*60 + x.appt_length[1] + x.appt_length[2]/60
                                    for (let i = 0; i < this.lineChartLabels.length; i++) {
                                        if (moment(x.start_time).format("ddd") === this.lineChartLabels[i]) {
                                            this.cutTimes[i] += cutMinutes
                                        }
                                    }
                                }
            
                            })
                            this.lineChartData = [{data:this.barberWages, label: 'Totals'}]
                            this.lineChartData2 = [{data:this.barberTips, label: 'Tips'}]
                            this.lineChartData3 = [{data:this.cutTimes, label: 'Time in Minutes'}]
                            this.doughnutChartData = this.doughnutData
            
                         })   
                         
                    })
    }

    doRefresh(refresher){
        this.doughnutData = [0,0];
        this.cutTimes=[0,0,0,0,0,0,0];
        this.barberWages = [0,0,0,0,0,0,0];
        this.barberTips = [0,0,0,0,0,0,0];
        this.storage.get('user').then(user => {
            
                        let earninfo = {
                                    'id' : user.b_id,
                                    'date1':  moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
                                    'date2': moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')
                                  }
                        this.service.getBarberStats(earninfo).subscribe((stats) => {
                            console.log("the stats", stats);
                            stats.map(x => {
            
                                //earnings doughnut
                                
                                //wages and tips line graph
                                if (x.total !== null){
                                    this.doughnutData[0] = this.doughnutData[0] + Number(x.total.split('$')[1])
                                    x.total = parseFloat(x.total.replace(/[^\d\.]/, ''));
                                }
                                if (x.tip !== null){
                                    this.doughnutData[1] = this.doughnutData[1] + Number(x.tip.split('$')[1])
                                    x.tip = parseFloat(x.tip.replace(/[^\d\.]/, ''));
                                }
                                for (let i = 0; i < this.lineChartLabels.length; i++) {
                                    if(moment(x.start_time).format("ddd") === this.lineChartLabels[i]){
                                        this.barberWages[i] +=  Number(x.total)
                                        this.barberTips[i] += Number(x.tip)
                                    }
                                }
            
                                //time spent cutting data
                                if  (x.appt_length){
                                    x.appt_length = x.appt_length.split(':').map(y=> parseInt(y));
                                    let cutMinutes = x.appt_length[0]*60 + x.appt_length[1] + x.appt_length[2]/60
                                    for (let i = 0; i < this.lineChartLabels.length; i++) {
                                        if (moment(x.start_time).format("ddd") === this.lineChartLabels[i]) {
                                            this.cutTimes[i] += cutMinutes
                                        }
                                    }
                                }
            
                            })
                            this.lineChartData = [{data:this.barberWages, label: 'Totals'}]
                            this.lineChartData2 = [{data:this.barberTips, label: 'Tips'}]
                            this.lineChartData3 = [{data:this.cutTimes, label: 'Time in Minutes'}]
                            this.doughnutChartData = this.doughnutData
            
                         })   
                         
                    })
        if(refresher != 0){
            refresher.complete();
          }
    }

}
