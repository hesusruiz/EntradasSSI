import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Options } from './options';
import {AppModule} from "../../../app/app.module";

@NgModule({
    declarations: [
        Options,
    ],
    imports: [
        IonicPageModule.forChild(Options),
        AppModule
    ],
    exports:[
        Options
    ]
})

export class OptionsModule { }
