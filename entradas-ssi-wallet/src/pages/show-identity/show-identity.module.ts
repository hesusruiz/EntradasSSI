import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowIdentityPage } from './show-identity';
import {NgxQRCodeModule} from "ngx-qrcode2";
import {AppModule} from "../../app/app.module";

@NgModule({
  declarations: [
    ShowIdentityPage,
  ],
    imports: [
        IonicPageModule.forChild(ShowIdentityPage),
        NgxQRCodeModule,
        AppModule,
    ],
})
export class ShowIdentityPageModule {}
