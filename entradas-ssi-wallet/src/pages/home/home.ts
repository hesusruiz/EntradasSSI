import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabsPage/tabsPage';
import { SessionSecuredStorageService } from '../../services/securedStorage.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { WalkthroughPage } from '../walkthrough/walkthrough';
import {RegisterPrivacyConditionsPage} from "../register/register-hub/register-privacy-conditions/register-privacy-conditions";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    login: any = {};
    tabs: any = {};
    isLoged: Boolean;
    isRegistered: Boolean;

    constructor(
        public navCtrl: NavController,
        private sessionSecuredStorageService: SessionSecuredStorageService,
        private faio: FingerprintAIO,
        public alertCtrl: AlertController,
        private storageSQL: Storage
    ) { }

    async ngOnInit(): Promise<void> {
        // Is session registered
        this.setLoginParams();
        return this.storageSQL.get('SqlCreated').then(
            (result) => {
                this.isRegistered = true;
                this.login.data.isRegistered = true;
                this.login.data.userRegister = result;
            }
        ).catch(
            (error) => {
                console.error('No esta registrado', error);
            }
        )


    }

    showAlert(title: string, message: string) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    onLogin(params: any) {
        if (this.storageSQL.get('SqlCreated')) {
            this.storageSQL.get('SqlCreated').then(
                (result) => {
                    params.username = this.sessionSecuredStorageService.getUsername();
                    console.log('params username', params.username, params.password);
                    this.sessionSecuredStorageService.checkPassword(params.username, params.password).then(
                        (res) => {
                            if (res) {
                                this.isLoged = true;
                                this.navCtrl.setRoot(TabsPage);
                            }
                            else {
                                this.showAlert('Credenciales erroneas', 'Las credenciales introducidas no son correctas');
                            }
                        }
                    ).catch(
                        (err) => {
                            this.showAlert('Error al comprobar credenciales', 'Ha habido un error al comprobar las credenciales');
                        }
                    );
                }
            ).catch(
                (error) => {
                    this.showAlert('User not registered', 'Create your account before login into the application');
                }
            );
        }
        // no esta registrado
        else {
            this.showAlert('User not registered', 'Create your account before login into the application');
        }
    }

    onRegister(params: any) {
        this.navCtrl.setRoot(RegisterPrivacyConditionsPage);
    }

    setLoginParams() {
        this.login.data = {
            "forgotPassword": "¿No recuerda la contraseña?",
            "labelPassword": "Contraseña",
            "labelUsername": "AlastriaID",
            "login": "Acceder",
            "loginalastria": "INICIAR SESIÓN",
            "logo": "assets/images/logo/logo2.png",
            "password": "Introduce tu contraseña:",
            "register": "¡Regístrate ahora!",
            "skip": "",
            "subtitle": "Bienvenido",
            "title": "Accede a tu cuenta",
            "username": "Introduce tu usuario",
            "dontHaveAccount": "¿Aun no tienes cuenta?",
            "newAccount": "Créala aquí",
            "errorUser": "Dato requerido",
            "errorPassword": "Dato requerido",
            "loginFinger": "Accede con tu huella",
            "help": "Ayuda"
        }

        let that = this;
        this.login.events = {
            onLogin: function (params) {
                that.onLogin(params);

            },
            onForgot: function () {

            },
            onRegister: function (params) {
                that.onRegister(params);
            },
            onSkip: function (params) {

            },
            onFacebook: function (params) {

            },

            regFinger: function (params) {
                that.regFinger();
            }
        };
    }

    regFinger() {
        return new Promise(
            (next, reject) => {
                this.faio.isAvailable().then(result => {
                    this.faio.show({
                        clientId: "AlastriaID",
                        clientSecret: "NddAHBODmhACXHITWJTU",
                        disableBackup: true,
                        localizedFallbackTitle: 'Touch ID for AlastriaID', //Only for iOS
                    }).then(result => {
                        next('Ok!');
                        this.isLoged = true;
                        this.navCtrl.setRoot(TabsPage);
                    }).catch(err => {
                        this.isLoged = false;
                        reject('Error in fingerprint');
                    });
                }).catch(err => {
                    if (err === "cordova_not_available") {
                        reject('Cordova not aviable');
                    }
                });
            }
        )

    }
}
