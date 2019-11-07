import {List, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {IonicPage, AlertController} from 'ionic-angular';
import {ToastService} from '../../../services/toast-service';
import {TabsService} from '../../../services/tabs-service';
import {OptionsComponent} from './options/options';
import {IdentitySecuredStorageService, SessionSecuredStorageService} from '../../../services/securedStorage.service';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-activity',
    templateUrl: 'activity.html',
    providers: [TabsService, ToastService]
})

export class Activity {

    @ViewChild(OptionsComponent)
    public optionsComponent: OptionsComponent;

    ///////data to get from securestorage
    username: User;
    name: string;
    surname: string;
    provider: string;
    email: string;
    ticketId: string;

    public type: string;

    credencialesEntregadas: Array<string> = [];
    datesPresented: any;

    private readonly CREDENTIAL_TYPE = "credentials";

    constructor(public sessionSecuredStorageService: SessionSecuredStorageService, private navParams: NavParams, private navCtrl:NavController, private storageSql: Storage
    ) {}

    ionViewDidEnter() {
        this.storageSql.get('ticketId').then((val) => {
            this.ticketId = val;
        });

        this.type = this.CREDENTIAL_TYPE;
        this.datesPresented = [];
        this.datesPresented = this.storageSql.get('presentationDates').then(value => {
            if (value != null) {
                this.datesPresented = JSON.parse(value);
            } else {
                this.datesPresented = [];
            }
        },(error)=>{},);
        console.log("informacion de fechas --> ", this.datesPresented);
        this.credencialesEntregadas = [];
        this.credencialesEntregadas = localStorage.getItem('provider') !== null ? JSON.parse(localStorage.getItem('provider')) : [];
        console.log('datos recibidos activity --> ',localStorage.getItem('provider'));

    }
}

interface User {

    name: string;
    surname: string;
    email: string;
    ticketId: string;

}
