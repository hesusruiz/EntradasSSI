import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { Camera } from '../tabsPage/camera/camera';
import {AppModule} from "../../app/app.module";

@NgModule({
    declarations: [
        Login,
    ],
    imports: [
        IonicPageModule.forChild(Login),

    ],
    exports: [
        Login
    ],
    entryComponents:[
        Camera
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LoginModule { }
