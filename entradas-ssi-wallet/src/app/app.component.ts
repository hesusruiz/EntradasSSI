import {Component, Input, ViewChild} from '@angular/core';
import {Platform, App, NavController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {UserProfilePage} from "../pages/tabsPage/user-profile/user-profile";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {Deeplinks} from '@ionic-native/deeplinks';
import {Login} from "../pages/login/login";
import {ServiceproviderrequestPage} from "../pages/serviceproviderrequest/serviceproviderrequest";
import {SecureStorage} from "@ionic-native/secure-storage";
import {SessionSecuredStorageService} from "../services/securedStorage.service";
import {Storage} from "@ionic/storage";
import {RegisterPrivacyConditionsPage} from "../pages/register/register-hub/register-privacy-conditions/register-privacy-conditions";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild(Platform) plat: Platform;

    rootPage: any = HomePage;
    platform: any;
    userProfile = UserProfilePage;
    value:string;
    isLogged:string=null;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App, private inAppBrowser: InAppBrowser, private deepLink: Deeplinks, private storage:Storage,
                ) {
        platform.ready().then(() => {
            this.platform=platform;
            this.isLogged=localStorage.getItem('userLogged');
            localStorage.setItem('credentialDates',this.getCurrentDate());

            storage.get('first_time').then((val) => {
                if (val !== null) {
                    console.log('already registered');
                } else {
                    console.log('probably the first time');
                    this.nav.push(RegisterPrivacyConditionsPage);
                }
            });

            this.deepLink.routeWithNavController(this.nav, {
                '/login': Login
            }).subscribe(match => {
                this.isLogged=localStorage.getItem('userLogged');

               this.searchJSON(match);

               if(this.value!='localhost') {
                  // secureStorage.saveURLjwt(this.value);
                   localStorage.setItem('urlVal', this.value);
                   localStorage.setItem('credentialDates',this.getCurrentDate());
               }
            }, nomatch => {
                console.error('Got a deeplink that didn\'t match', nomatch);
            });
        });
    }

    exitApp(){
        this.platform.exitApp();
    }

    searchJSON(data: any) {

        for (let k in data) {
            if (typeof data[k] == "object" && data[k] !== null) {
                this.searchJSON(data[k]);
            } else {
                if (k == 'host') {
                    this.value=data[k];
                    console.log('valor dentro del searchJSON: '+this.value);

                }
            }

        }
    }

    getCurrentDate(): string {
        let today = new Date();
        let date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
        return date
    }

    openURL(url:string){
        window.open(url,'_system', 'location=yes');
    }

    pushPage(page:string
    ) {
        this.nav.push(page);
    }


}
