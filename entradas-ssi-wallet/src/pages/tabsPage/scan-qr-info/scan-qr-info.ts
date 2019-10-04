import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Camera} from "../camera/camera";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ServiceproviderrequestPage} from "../../serviceproviderrequest/serviceproviderrequest";
import {ScannerErrorPage} from "../../scanner-error/scanner-error";
import {CredentialProvider} from "../../../providers/credential/credential";
import {CredentialRequestProvider} from "../../../providers/credential-request/credential-request";
import {HeaderUserRequest, VerifiableCredential} from "../../../models/CredentialRequest";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private scanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrInfoPage');
  }

  openScanner() {
    this.scanner.scan().then(barcodeData => {
      if (!barcodeData){
        alert('Error: Contacte con el service provider.')
      }else {
        let wanted;
        let dataQR: HeaderUserRequest = JSON.parse(barcodeData.text);
        dataQR.vc.forEach((data:VerifiableCredential) =>{
          data.credentialSubject.ticketId = wanted;
          console.log("SIIIIIIIU");
        });
        this.navCtrl.push(ServiceproviderrequestPage);
      }
    }).catch(err => {
      console.log('Error', err);
      this.navCtrl.push(ScannerErrorPage);
    });
  }

}
