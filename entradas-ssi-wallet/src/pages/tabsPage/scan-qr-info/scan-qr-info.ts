import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Camera} from "../camera/camera";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ServiceproviderrequestPage} from "../../serviceproviderrequest/serviceproviderrequest";
import {ScannerErrorPage} from "../../scanner-error/scanner-error";

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

      if (barcodeData===null){
        this.navCtrl.push(ScannerErrorPage);
      }else {

        this.navCtrl.push(ServiceproviderrequestPage)
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }


}
