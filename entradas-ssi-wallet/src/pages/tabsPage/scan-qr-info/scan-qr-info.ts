import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Camera} from "../camera/camera";
import {BarcodeScanner, BarcodeScanResult} from "@ionic-native/barcode-scanner";
import {ServiceproviderrequestPage} from "../../serviceproviderrequest/serviceproviderrequest";
import {ScannerErrorPage} from "../../scanner-error/scanner-error";
import {CredentialProvider} from "../../../providers/credential/credential";
import {CredentialRequestProvider} from "../../../providers/credential-request/credential-request";
import {CredentialSubject, HeaderUserRequest, VerifiableCredential} from "../../../models/CredentialRequest";

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
    checkCredentials:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private scanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrInfoPage');
  }

  openScanner() {
    this.scanner.scan().then(barcodeData => {
      if (!barcodeData) {
        alert('Error: Contacte con el service provider.')
      } else {
        console.log('ENTRA')
        let dataQR
            = JSON.parse(barcodeData.text);
        let wantedRq = this.searchJSON(dataQR);
        this.navCtrl.push(ServiceproviderrequestPage,{wantedRq:'wantedRq'});
      }
    }).catch(err => {
      console.log('Error', err);
      this.navCtrl.push(ScannerErrorPage);
    });
  }

  searchJSON(data: any){
    for(let k in data){
      if(typeof  data[k]=="object" && data[k]!==null){
        this.searchJSON(data[k]);
      }
      else{
        if(k=='field_name'){
            return data[k];
        }
      }

    }
  }

}
