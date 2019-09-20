import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPwdPage } from './register-pwd';
import {RegisterPrivacyConditionsPage} from "../register-privacy-conditions/register-privacy-conditions";

@NgModule({
  declarations: [
    RegisterPwdPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPwdPage),
  ],
    exports: [
  RegisterPwdPage
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPwdPageModule {}
