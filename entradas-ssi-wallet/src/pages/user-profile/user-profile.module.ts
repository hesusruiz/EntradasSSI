import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilePage } from './user-profile';
import {AppModule} from "../../app/app.module";

@NgModule({
  declarations: [
    UserProfilePage,
  ],
    imports: [
        IonicPageModule.forChild(UserProfilePage),
        AppModule,
    ],
})
export class UserProfilePageModule {}
