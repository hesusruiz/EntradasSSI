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
    private isPasswordRegex: boolean =true;

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
        this.doPasswordsMatch = true;
        this.isPasswordValid = true;
        if (this.pwd === this.pwd2) {
            // if (this.pwd.search(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+-]).{6,}/) >= 0) {
                return true;
            // } else {
            //     this.isPasswordValid = false;
            //     return false;
            // }
        } else {
            this.doPasswordsMatch = false;
            return false;
        }
    }
    goToBack(): void {
        this.navCtrl.pop();
    }
}
