import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterForm} from "../register-form/register-form";
import {RegisterPwdPage} from "../register-pwd/register-pwd";

@IonicPage()
@Component({
  selector: 'page-register-privacy-conditions',
  templateUrl: 'register-privacy-conditions.html',
})
export class RegisterPrivacyConditionsPage {

    public isChecked:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPrivacyConditionsPage');
  }

  NavigateToRegisterForm(){
      this.navCtrl.push(RegisterPwdPage);
  }

  notifyChecked(){
      this.isChecked = !this.isChecked;
  }
}
