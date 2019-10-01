import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { HomePage } from '../home/home';
import { SessionSecuredStorageService } from '../../services/securedStorage.service';

@IonicPage()
@Component({
    selector: 'tabsPage',
    templateUrl: 'tabsPage.html'
})
export class TabsPage {

    login: any = {};
    tabs: any = {};
    isLoged: Boolean;

    constructor(public navCtrl: NavController, private sessionSecuredStorageService: SessionSecuredStorageService) {

        this.sessionSecuredStorageService.isRegistered().then(
            (result) => {
                this.isLoged = true;
            }
        ).catch(
            () => {
                this.isLoged = false;
                this.navCtrl.setRoot(HomePage);
            }
        )

        this.setTabsParams();
    }

    setTabsParams() {
        console.log("Entra en el método");
        this.tabs.data = [
            { page: "UserProfilePage", icon: "albums"},
            { page: "ScanQrInfoPage", icon: "qr-scanner"},
            { page: "Activity", icon: "list"},
        ];

        this.tabs.events = {
            'onItemClick': function (item: any) {
            }
        };
    }

}
