import {List, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {IonicPage, AlertController} from 'ionic-angular';
import {ToastService} from '../../../services/toast-service';
import {TabsService} from '../../../services/tabs-service';
import {OptionsComponent} from './options/options';
import {IdentitySecuredStorageService, SessionSecuredStorageService} from '../../../services/securedStorage.service';

@IonicPage()
@Component({
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
    provider:string;
    email: string;
    ticketId: string;

    public type: string;

    credencialesEntregadas: Array<string>=[];

    private readonly CREDENTIAL_TYPE = "credentials";

    constructor(
        public sessionSecuredStorageService: SessionSecuredStorageService, private navParams: NavParams
    ) {
        this.type = this.CREDENTIAL_TYPE;

        if(navParams.get('cred') != undefined || navParams.get('prov') != null){
            this.credencialesEntregadas.push(navParams.get('prov'));
            this.credencialesEntregadas.reverse();
        }

    }
}

interface User {

    name: string;
    surname: string;
    email: string;
    ticketId: string;

}
