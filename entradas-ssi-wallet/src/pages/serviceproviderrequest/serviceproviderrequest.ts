import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
import {SessionSecuredStorageService} from "../../services/securedStorage.service";
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

    user: User;
    company: string;
    isChecked:boolean =true;
    provider:string[];
    cardsState: boolean[] = [
        true, false, false, false
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams, secureStorage: SessionSecuredStorageService) {

        let value = navParams.get('wantedRq');
        this.provider=JSON.parse(localStorage.getItem('provider'));
        console.log(value);
        if (value === "ticketID") {
            secureStorage.getUsername().then(
                (result) => {
                    this.user = result.split(" ");
                    this.user.name = this.user[0];
                    if(this.user[2]===null || this.user[2]===undefined){
                        this.user.surnames=this.user[1];
                    }else {
                        this.user.surnames = this.user[1] + " " + this.user[2];
                    }
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

    showIdentity() {
      this.navCtrl.push(ShowIdentityPage, {userDetails:this.cardsState})
    }

    openURL(){
        let proc=localStorage.getItem('procUrl');
        window.open(proc,'_system', 'location=yes');
    }

    checkChange(event, item) {
        this.cardsState[item] = !this.cardsState[item];
        console.log(this.cardsState);
    }

    notifyChecked(){
        this.isChecked = !this.isChecked;
    }



}
