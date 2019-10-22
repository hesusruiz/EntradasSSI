import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
import {Base64} from 'js-base64';
import {Activity} from "../tabsPage/activity/activity";
import {Storage} from "@ionic/storage";


/**
 * Generated class for the ShowIdentityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-show-identity',
    templateUrl: 'show-identity.html',
})
export class ShowIdentityPage {

    cardsState: boolean[]=null;
    qrData: any;
    credentialDecripted;
    credentials;
    kid:any;
    credentialsList: any[]=[];
    jsontokens = require('jsontokens');

    headerJwt;

    jwtPayload;

    constructor(public navCtrl: NavController, public navParams: NavParams, private localStoragy:Storage) {
        this.cardsState = navParams.get('userDetails');
        console.log('cardStatessssss', this.cardsState);
        this.kid=localStorage.getItem('kid');
        let key= localStoragy.get('key');

        console.log('el kid:' , this.kid);

        this.headerJwt = {
            "alg": "ES256",
            "typ": "JWT",
            "kid": this.kid.toString(),
        };

        if(this.cardsState[0]===true){
           this.credentialsList.push(localStorage.getItem('jwt-ticketID'));
        }if(this.cardsState[1]===true){
            this.credentialsList.push(localStorage.getItem('jwt-name'));
        }if(this.cardsState[2]===true){
            this.credentialsList.push(localStorage.getItem('jwt-surnames'));
        }if(this.cardsState[3]===true){
            this.credentialsList.push(localStorage.getItem('jwt-mail'));
        }

        console.log(this.credentialsList);

        this.credentials = Base64.encode(this.credentialsList);
        console.log('CREDENTIAL in b64: '+this.credentials);

        this.jwtPayload = {
            "iss": "did:alastria:quorum:redt:QmeeasCZ9jLbX...ueBJ7d7csxhb",
            "aud": "did:alastria:quorum:redt:"+this.kid.toString(),
            "iat": 1525465044,
            "vp": {
                "@context": [
                    "https://www.w3.org/2018/credentials/v1",
                    "JWT"
                ],
                "type": ["VerifiablePresentation", "AlastriaVPTicket"],
                "proc": "H398sjHd...kldjUYn475n",
                "verifiableCredential": [this.credentials]
            }
        };

        this.qrData=this.generateToken();
        console.log(this.qrData);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ShowIdentityPage');
    }

    generateToken() {

        let privatekey=localStorage.getItem('privateKey');
        let publickey=localStorage.getItem('publicKey');


        let tokenToSign= new this.jsontokens.TokenSigner('ES256k', privatekey).sign(this.jwtPayload, false, this.headerJwt);
        console.log('token to sign: ', tokenToSign);

        let verify= new this.jsontokens.TokenVerifier('ES256k', publickey ).verify(tokenToSign);
        console.log('is the token verified?: ', verify);

        return tokenToSign;
    }

    showIdentity() {
        this.navCtrl.push(Activity, {cred:this.credentialDecripted})
    }

}
