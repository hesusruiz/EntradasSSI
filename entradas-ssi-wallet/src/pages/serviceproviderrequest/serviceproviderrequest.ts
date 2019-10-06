import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";
import {IdentitySecuredStorageService, SessionSecuredStorageService} from "../../services/securedStorage.service";

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
  wantedRq: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, secureStorage: SessionSecuredStorageService) {

     this.wantedRq = this.navParams.get('wantedRq');
      if (this.wantedRq === "ticketID") {
          secureStorage.getUsername().then(
              (result) => {
                this.user = result.split(" ");
                this.user.name = this.user[0];
                this.user.surnames = this.user[1] + " " + this.user[2];
              }
          );
          secureStorage.getTicketId().then(
              (result) => {
                this.user.ticketId = result;
              }
          );
          secureStorage.getEmail().then(
              (result) => {
                this.user.email = result;
              }
          );
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceproviderrequestPage');

  }


}
