import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowIdentityPage } from './show-identity';
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
  declarations: [
    ShowIdentityPage,
  ],
    imports: [
        IonicPageModule.forChild(ShowIdentityPage),
        NgxQRCodeModule,
    ],
})
export class ShowIdentityPageModule {}
