import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SessionSecuredStorageService} from "../../services/securedStorage.service";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  username: User;
  name: string;
  surname: string;
  email: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sessionSecuredStorageService: SessionSecuredStorageService) {

    this.sessionSecuredStorageService.getUsername().then(
        (result) => {
          this.username = result.split(" ");
          this.name= this.username[0];
          this.surname = this.username[1]+" "+this.username[2];
        }
    );

    this.sessionSecuredStorageService.getEmail().then(
        (result)=>{
          this.email=result;
        }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

}

interface User {

  name: string;
  surname: string;
  email: string;

}
