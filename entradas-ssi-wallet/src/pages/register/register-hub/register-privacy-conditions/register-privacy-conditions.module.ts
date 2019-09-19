import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RegisterPrivacyConditionsPage} from './register-privacy-conditions';

@NgModule({
    declarations: [
        RegisterPrivacyConditionsPage,
    ],
    imports: [
        IonicPageModule.forChild(RegisterPrivacyConditionsPage),
    ],
    exports: [
        RegisterPrivacyConditionsPage
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RegisterPrivacyConditionsPageModule {
}
