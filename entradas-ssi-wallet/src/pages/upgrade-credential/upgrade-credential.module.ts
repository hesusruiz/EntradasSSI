import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpgradeCredentialPage } from './upgrade-credential';

@NgModule({
  declarations: [
    UpgradeCredentialPage,
  ],
  imports: [
    IonicPageModule.forChild(UpgradeCredentialPage),
  ],
})
export class UpgradeCredentialPageModule {}
