import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannerErrorPage } from './scanner-error';

@NgModule({
  declarations: [
    ScannerErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannerErrorPage),
  ],
})
export class ScannerErrorPageModule {}
