import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ITimer } from './itimer';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {
    event: any;
    @Input() timeInSeconds: number;
    public timer: ITimer;

    constructor(
      public navParams: NavParams,
      private service: HttpServiceProvider) {
      this.event = this.navParams.get('event')
    }

    ngOnInit() {
        this.initTimer();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }

    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 0; }

        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }

    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
        this.service.startAppt({"a_id":this.event.a_id}).subscribe()
    }

    pauseTimer() {
        this.timer.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining++;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (this.timer.secondsRemaining >= 0) {
                this.timerTick();
            }
            else {
                this.timer.hasFinished = true;
            }
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }

}
