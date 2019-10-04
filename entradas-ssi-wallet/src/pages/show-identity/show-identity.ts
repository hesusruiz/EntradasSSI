import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  nombre: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nombre = "Dani";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowIdentityPage');
  }

}
