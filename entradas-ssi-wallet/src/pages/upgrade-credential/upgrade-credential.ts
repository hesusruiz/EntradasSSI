import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UpgradeCredentialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upgrade-credential',
  templateUrl: 'upgrade-credential.html',
})
export class UpgradeCredentialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl.canSwipeBack();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradeCredentialPage');

  }


  goBack(){
    this.navCtrl.pop().then( data =>{
      console.log("OK",data)
    });
  }
}
