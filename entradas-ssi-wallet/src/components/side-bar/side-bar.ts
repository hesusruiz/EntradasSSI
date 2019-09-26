import { Component } from '@angular/core';
import {NavController} from "ionic-angular";

/**
 * Generated class for the SideBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'side-bar',
  templateUrl: 'side-bar.html'
})
export class SideBarComponent {

  text: string;

  constructor(public navCtr: NavController) {
    console.log('Hello SideBarComponent Component');
    this.text = 'Hello World';
  }

  openPage(pageName: string) {
    console.log("Opening page: "+pageName);
    this.navCtr.push(pageName);
  }

}
