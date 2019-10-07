import {Component, ViewChild} from '@angular/core';
import {Platform, App, NavController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {UserProfilePage} from "../pages/tabsPage/user-profile/user-profile";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    userProfile = UserProfilePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App, private inAppBrowser: InAppBrowser, private deepLink: Deeplinks) {
        platform.ready().then(() => {
            this.deepLink.routeWithNavController(this.nav, {
                '/login':'Login'
            }).subscribe(match => {
                console.log('Successfully matched route', match);
            }, nomatch => {
                console.error('Got a deeplink that didn\'t match', nomatch);
            });


        });
    }

    pushPage(page:string) {
        this.nav.push(page);
    }

    openURL(url: string) {
        const browser = this.inAppBrowser.create(url, '_system');
        browser.show();
    }
}

