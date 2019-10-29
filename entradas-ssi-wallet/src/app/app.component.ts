import {Component, ViewChild} from '@angular/core';
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

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App, private inAppBrowser: InAppBrowser, private deepLink: Deeplinks, private secureStorage:SessionSecuredStorageService,
                ) {
        platform.ready().then(() => {
            this.platform=platform;
            this.deepLink.routeWithNavController(this.nav, {
                '/login': Login
            }).subscribe(match => {
                console.log('match: ', match);

               this.searchJSON(match);

               if(this.value!='localhost') {
                   console.log('valor desde app.component'+this.value);
                  // secureStorage.saveURLjwt(this.value);
                   localStorage.setItem('urlVal', this.value);
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

    pushPage(page:string
    ) {
        this.nav.push(page);
    }


}
