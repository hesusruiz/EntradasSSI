import {Component, ViewChild} from '@angular/core';
import {Platform, App, NavController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {UserProfilePage} from "../pages/tabsPage/user-profile/user-profile";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {Deeplinks} from "@ionic-native/deeplinks";
import {Login} from "../pages/login/login";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    userProfile = UserProfilePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App, private inAppBrowser: InAppBrowser, private deeplinks:Deeplinks) {
        console.log("[Debug] App enter");

        platform.ready().then(() => {
            this.deeplinks.route({
                '/index.html': Login
            }).subscribe((match) => {
                    // match.$route - the route we matched, which is the matched entry from the arguments to route()
                    // match.$args - the args passed in the link
                    // match.$link - the full link data
                    console.log('Successfully matched route', match);
                },
                (nomatch) => {
                    // nomatch.$link - the full link data
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

