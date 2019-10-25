import {List, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {IonicPage, AlertController} from 'ionic-angular';
import {ToastService} from '../../../services/toast-service';
import {TabsService} from '../../../services/tabs-service';
import {OptionsComponent} from './options/options';
import {IdentitySecuredStorageService, SessionSecuredStorageService} from '../../../services/securedStorage.service';

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

    private readonly CREDENTIAL_TYPE = "credentials";

    constructor(public sessionSecuredStorageService: SessionSecuredStorageService, private navParams: NavParams, private navCtrl:NavController
    ) {}

    ionViewDidEnter() {
        this.ticketId = localStorage.getItem('_SS_ticketId');
        this.type = this.CREDENTIAL_TYPE;
        this.credencialesEntregadas = [];
        this.credencialesEntregadas = localStorage.getItem('provider') !== null ? JSON.parse(localStorage.getItem('provider')) : [];
        console.log('datos recibidos activity --> ',localStorage.getItem('provider'));
        // if (this.navParams.get('prov')!= null || this.navParams.get('prov')!= undefined ) {
        //     // this.credencialesEntregadas.unshift(this.navParams.get('prov'));
        //    // localStorage.setItem('credEntregadas', JSON.stringify(this.credencialesEntregadas));
        // }
    }
}

interface User {

    name: string;
    surname: string;
    email: string;
    ticketId: string;

}
