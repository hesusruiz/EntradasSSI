import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {SessionSecuredStorageService} from "../../services/securedStorage.service";

/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

    public userName: string;
    public userImagePath: string;

    constructor(
        public modalCtrl: ModalController,
        private navCtrl: NavController,
        public sessionSecuredStorageService: SessionSecuredStorageService
    ) {
        this.sessionSecuredStorageService.getUsername().then(
            (result) => {
                this.userName = result;
            }
        );
        this.userImagePath = "./assets/images/avatar/0.jpg";
    }

    dismiss() {
        this.navCtrl.pop();
    }

}
