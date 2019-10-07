import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";

/**
 * Generated class for the ShowIdentityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-identity',
  templateUrl: 'show-identity.html',
})
export class ShowIdentityPage {

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user= navParams.get('user');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowIdentityPage');
  }

}
