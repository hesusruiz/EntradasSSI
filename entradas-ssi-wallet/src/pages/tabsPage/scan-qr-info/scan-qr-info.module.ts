import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanQrInfoPage } from './scan-qr-info';

@NgModule({
  declarations: [
    ScanQrInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanQrInfoPage),
  ],
  exports:[
    ScanQrInfoPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScanQrInfoPageModule {}
