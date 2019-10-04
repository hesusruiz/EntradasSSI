import {Component, ViewChild} from '@angular/core';
import {Platform, App, NavController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {UserProfilePage} from "../pages/tabsPage/user-profile/user-profile";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    userProfile = UserProfilePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App, private inAppBrowser: InAppBrowser) {
        console.log("[Debug] App enter");
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (platform.is('android')) {
                statusBar.backgroundColorByHexString('#325b8e');
            }
            splashScreen.hide();
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

