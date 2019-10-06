import {Component, Input} from '@angular/core';
import {NavController, ModalController, AlertController, NavParams} from 'ionic-angular';
import {HomePage} from '../../../home/home';
import {TermsConditionsPage} from '../../../terms-conditions/terms-conditions';
import {SessionSecuredStorageService} from '../../../../services/securedStorage.service';
import {IdentitySecuredStorageService} from '../../../../services/securedStorage.service';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {CredentialRequestProvider} from "../../../../providers/credential-request/credential-request";
import {KeyGeneratorService} from "../../../../services/KeyGenerator.service";
import {CredentialProvider} from "../../../../providers/credential/credential";

@Component({
    selector: 'register-form',
    templateUrl: 'register-form.html'
})
export class RegisterForm {

    @Input() events: any;

    // public username: string;

    //els meus
    public name: string;
    public surnames: string;
    public email: string;
    public password: string;
    public ticketId: string;
    // public password_correct: string;

    private isEmailValid: boolean = true;
    //  private isUsernameValid: boolean = true;
    // private isPasswordValid: boolean = true;

    private regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private navCtrl: NavController,
                public modalCtrl: ModalController,
                public sessionSecuredStorageService: SessionSecuredStorageService,
                public identitySecuredStorageService: IdentitySecuredStorageService,
                public alertCtrl: AlertController, private scanner: BarcodeScanner, public navParams: NavParams,
                public credentialRequest: CredentialRequestProvider, private keyGenerator: KeyGeneratorService) {

        this.password = navParams.get('pwd');


        this.events = {
            onRegister: () => {
                // let modal = this.modalCtrl.create(TermsConditionsPage);
                // console.log(this.password);
                // modal.present();
                // modal.onDidDismiss((res) => {
                //     /* Guardo en el secureStorage */
                //     if (res.accept === 'true') {
                        this.sessionSecuredStorageService.register(this.name + " " + this.surnames, this.password, this.email, this.ticketId)
                            .then(
                                () => {
                                    console.log('Información guardada correctamente en el secureStorage');
                                    // this.credentialRequestService.getCredentials("did:alastria:quorum", "redt",this.ticketId,this.name);
                                    // let encodedKey=keyGenerator.generatePublicPrivateKey();
                                    //
                                    // this.identitySecuredStorageService.getKeys().then((result) => {
                                    //     this.credentialRequest.requestCredential(encodedKey, this.email, this.name, this.surnames, this.ticketId);
                                    // });

                                    let userData= [this.name, this.surnames, this.email, this.ticketId];

                                    this.sessionSecuredStorageService.saveUserData(userData);

                                    userData.forEach(function (value) {
                                        // let newCredential= new CredentialProvider(issuer,value,isActive,issueDate,expireDate,level);
                                    });

                                    let currentDate=new Date();
                                    console.log(currentDate);

                                    let i=0;
                                    while (i<userData.length){
                                        let newCredential= new CredentialProvider('cred'+i,'in2',userData[i],true, currentDate.toLocaleTimeString(),'213',0);
                                        this.sessionSecuredStorageService.saveCredential('_'+i,newCredential);

                                        i++;
                                    }

                                    /* Redirecciono a la pagina principal */
                                    this.navCtrl.setRoot(HomePage);
                                }
                            )
                            .catch(
                                (err) => {
                                    console.error('Error al guardar en el secureStorage ', err);
                                    this.showAlert('Usuario Registrado', 'El usuario ya estaba registrado');
                                }
                            );
                    }
        //         });
        //     }
        //     ,
        //     onSkip: () => {
        //         this.navCtrl.setRoot(HomePage);
        //     },
        //     onBack: () => {
        //         this.navCtrl.setRoot(HomePage);
        //     }
         }
    }

    createCredential(id:string,issuer: string, name: string, isActive: boolean, issueDate: string,
                     expireDate: string, level: number): CredentialProvider{

        return new CredentialProvider(id,issuer,name,isActive,issueDate,expireDate,level);

    }

    showAlert(title: string, message: string) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    onEvent = (event: string): void => {
        if (event == "onRegister"
        && !this.validate()
        ) {
            return;
        }
        if (this.events[event]) {
            this.events[event]({
                // 'username': this.username,
                'password': this.password,
                'email': this.email
            });
        }
    }

    //Scanner para recoger datos del usuario a partir de QR
    openScanner() {
        this.scanner.scan().then(barcodeData => {

            let dataQR: User = JSON.parse(barcodeData.text);

            this.name = dataQR.name;
            this.surnames = dataQR.surname;
            this.email = dataQR.email;
            this.ticketId= dataQR.ticketId;

        }).catch(err => {
            console.log('Error', err);
        });
    }

    validate(): boolean {
        this.isEmailValid = true;
        //this.isUsernameValid = true;
        // this.isPasswordValid = true;
        //
        // // if (!this.username || this.username.length == 0) {
        // //     this.isUsernameValid = false;
        // // }
        //
        // if (!this.password || this.password.length == 0) {
        //     this.isPasswordValid = false;
        // }
        //
        // if (!this.password || this.password.length == 0) {
        //     this.isPasswordValid = false;
        // }

        this.isEmailValid = this.regex.test(this.email);

        return this.isEmailValid ;
            // this.isPasswordValid ;
            // &&
            // this.isUsernameValid;
    }
}

interface User {

    name: string;
    surname: string;
    email: string;
    ticketId: string;

}
