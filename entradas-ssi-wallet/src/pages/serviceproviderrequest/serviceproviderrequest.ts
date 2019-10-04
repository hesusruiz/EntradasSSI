import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";
import {ShowIdentityPage} from "../show-identity/show-identity";

/**
 * Generated class for the ServiceproviderrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serviceproviderrequest',
  templateUrl: 'serviceproviderrequest.html',
})
export class ServiceproviderrequestPage {

  user : User;
  company: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceproviderrequestPage');
      this.user.name='Juan';
      this.user.surnames='Garcia Garcia';
      this.user.email='jgarcia@gmail.com';
      this.user.ticketId='12371283had';
  }

  showIdentity(){
    this.navCtrl.push(ShowIdentityPage);
  }

}
