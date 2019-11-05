import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera} from "../camera/camera";
import {BarcodeScanner, BarcodeScanResult} from "@ionic-native/barcode-scanner";
import {ServiceproviderrequestPage} from "../../serviceproviderrequest/serviceproviderrequest";
import {ScannerErrorPage} from "../../scanner-error/scanner-error";
import {CredentialProvider} from "../../../providers/credential/credential";
import {CredentialRequestProvider} from "../../../providers/credential-request/credential-request";
import {decodeToken} from 'jsontokens';
import {encodeToken} from 'jsontokens';
import {HttpErrorResponse} from "@angular/common/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ScanQrInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-scan-qr-info',
    templateUrl: 'scan-qr-info.html',
})
export class ScanQrInfoPage {
    jwt: any;
    checkCredentials: boolean = false;
    jsontokens = require('jsontokens');
    reSplitted:any;
    backendId:string='did_back_end';
    mailAccepted: string;


    constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner, private credentialRequestProvider: CredentialRequestProvider,
    private postValidateDid: CredentialRequestProvider) {

      credentialRequestProvider.getJWT().subscribe((result: any) => {
        let data=JSON.stringify(result);
        console.log('HA LLEGADO: '+data);

        let splitted= data.split(":");
        this.reSplitted=splitted[1].split('"');

          localStorage.setItem('jwt-name', this.reSplitted[1]);
          localStorage.setItem('jwt-surnames', this.reSplitted[3]);
          localStorage.setItem('jwt-mail', this.reSplitted[5]);
          localStorage.setItem('jwt-ticketID', this.reSplitted[7]);

        let tokenText = new this.jsontokens.decodeToken(this.reSplitted[1]);

        console.log('tokentext: '+tokenText);

        this.searchKID(this.jwt);
        console.log('KID:' + tokenText.header.kid);

       let resultado= postValidateDid.postValidateDid(this.backendId,tokenText.header.kid);
       resultado
           .subscribe((result: any) => {
             console.log(result);
           }, (errorResponse: HttpErrorResponse) => {
             console.error(errorResponse);
           });
      }, (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        });
    }

    searchKID(data: any) {

        for (let k in data) {
            if (typeof data[k] == "object" && data[k] !== null) {
                this.searchJSON(data[k]);
            } else {
                if (k == 'jwt') {
                    console.log('valor dentro del searchKID: ' + data[k]);
                }
            }
        }
    }


    ionViewDidEnter() {
        this.mailAccepted=localStorage.getItem('urlVal');
    }

    openScanner() {
        this.scanner.scan().then(barcodeData => {
            if(barcodeData.cancelled){
                this.navCtrl.pop().then( val =>{
                    console.log(val);
                });
            }

            if (!barcodeData) {
                alert('Error: Contacte con el service provider.')
            } else {
                console.log('ENTRA');

                let jwt = require("jsonwebtoken");
                let dataQR = jwt.decode(barcodeData.text);
                this.searchJSON(dataQR);
                //console.log(wantedRq);

            }
        }).catch(err => {
            console.log('Error', err);
            this.navCtrl.push(ScannerErrorPage);
        });
    }

    searchJSON(data: any) {
        for (let k in data) {
            if (typeof data[k] == "object" && data[k] !== null) {
                this.searchJSON(data[k]);
            } else {
                if (k=='procUrl'){
                    localStorage.setItem('procUrl', data[k]);
                }
                if (k == 'provider') {
                    console.log('El provider',data[k]);
                    console.info('el provider antes del set->',localStorage.getItem('provider'));
                    let provider: Array<string> = localStorage.getItem('provider') != null ? localStorage.getItem('provider').search("]") >= 0 ? JSON.parse(localStorage.getItem('provider')) : [localStorage.getItem('provider')]:[];
                    provider.push(data[k]);
                    localStorage.setItem('provider',JSON.stringify(provider));
                }
                if (k == 'field_name') {
                    console.log(data[k]);
                    this.navCtrl.push(ServiceproviderrequestPage, {wantedRq: data[k]});
                }
            }
        }
        this.navCtrl.push(ScannerErrorPage);
    }

}
