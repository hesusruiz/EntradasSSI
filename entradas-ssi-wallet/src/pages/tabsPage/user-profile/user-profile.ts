import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SessionSecuredStorageService} from "../../../services/securedStorage.service";
import {TabsService} from "../../../services/tabs-service";
import {ToastService} from "../../../services/toast-service";
import {User} from "../../../models/User";
import {window} from "rxjs/operators";


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
    providers: [TabsService, ToastService]
})
export class UserProfilePage {

    username: User;
    name: string;
    surname: string;
    email: string;
    ticketId:string;
    mailAccepted: string;
    createdDate:string;


    constructor(public navCtrl: NavController, public navParams: NavParams, public sessionSecuredStorageService: SessionSecuredStorageService) {



    }



    ionViewDidEnter() {
        console.log('ionViewDidLoad UserProfilePage');
        this.mailAccepted=localStorage.getItem('urlVal');
        this.createdDate=localStorage.getItem('credentialDates');

        this.sessionSecuredStorageService.getUsername().then(
            (result) => {
                this.username = result.split(" ");
                this.name = this.username[0];
                if(this.username[2]===null || this.username[2]===undefined){
                    this.surname = this.username[1];
                }else {
                    this.surname = this.username[1] + " " + this.username[2];
                }
            }
        );

        this.sessionSecuredStorageService.getEmail().then(
            (result) => {
                this.email = result;
            }
        );

        this.sessionSecuredStorageService.getTicketId().then(
            (result) => {
                this.ticketId = result;
            }
        );
    }

    refreshPage() {
        console.log('refresh page');
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

}
