import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
  
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('lineCanvas2') lineCanvas2;
    @ViewChild('lineCanvas3') lineCanvas3;
 
    doughnutChart: any;
    lineChart: any;
    lineChart2: any;
    lineChart3: any;
 
 
    constructor(public navCtrl: NavController) {
 
    }
 
    ionViewDidLoad() {

        this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                datasets: [
                    {
                        label: "Wages",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(0, 255, 204,0.3)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [304,405,298,340,460],
                        spanGaps: false,
                    }
                ]
            }
 
        });

        this.lineChart3 = new Chart(this.lineCanvas3.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                datasets: [
                    {
                        label: "Tips",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(0, 255, 204,0.3)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [96,108,87,94,128],
                        spanGaps: false,
                    }
                ]
            }
 
        });
 
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ['Wages','Tips'],
                datasets: [{
                    label: 'Wages vs. Tips',
                    data: [1807,513],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(0, 255, 204,0.3)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "rgba(0, 255, 204,0.9)"
                    ]
                }]
            }
 
        });
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                datasets: [
                    {
                        label: "Time Spent Cutting (mins)",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(0, 255, 204,0.3)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [98, 113, 67, 79, 102],
                        spanGaps: false,
                    }
                ]
            }
 
        });
 
    }

}
