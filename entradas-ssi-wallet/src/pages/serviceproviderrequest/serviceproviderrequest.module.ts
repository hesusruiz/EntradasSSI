import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceproviderrequestPage } from './serviceproviderrequest';

@NgModule({
  declarations: [
    ServiceproviderrequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceproviderrequestPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ServiceproviderrequestPageModule {}
