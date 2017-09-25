import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPopOverPage } from './login-pop-over';

@NgModule({
  declarations: [
    LoginPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPopOverPage),
  ],
})
export class LoginPopOverPageModule {}
