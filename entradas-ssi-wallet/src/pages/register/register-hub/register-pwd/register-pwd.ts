import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RegisterForm} from "../register-form/register-form";

/**
 * Generated class for the RegisterPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register-pwd',
    templateUrl: 'register-pwd.html',
})
export class RegisterPwdPage {

    public pwd: string;
    public pwd2: string;
    private isPasswordValid: boolean = true;
    private doPasswordsMatch: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPwdPage');
    }

    navigateToRegisterForm() {
        if (!this.validate()) {
            return;
        } else {
            this.navCtrl.push(RegisterForm, {pwd: this.pwd});
        }
    }

    validate(): boolean {
        this.isPasswordValid = true;
        this.doPasswordsMatch = true;
        // if (!this.username || this.username.length == 0) {
        //     this.isUsernameValid = false;
        // }

        if (!this.pwd || this.pwd.length == 0) {
            this.isPasswordValid = false;
        }

        if (this.pwd != this.pwd2) {
            this.doPasswordsMatch = false;
        }

        return this.doPasswordsMatch &&
            this.isPasswordValid;

    }

}
