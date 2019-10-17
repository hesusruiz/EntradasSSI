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

    user: User;
    qrData: any;
    credentialDecripted;
    credentials;
    kid:any;
    jsontokens = require('jsontokens');

    headerJwt = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": this.kid,
    };

    jwtPayload;

    constructor(public navCtrl: NavController, public navParams: NavParams, private localStorage:Storage) {
        this.user = navParams.get('user');
        this.kid=localStorage.get('kid');
        let key= localStorage.get('key');


        this.credentials = Base64.encode(this.user.ticketId);
        this.credentialDecripted=this.user.ticketId;
        console.log('CREDENTIAL: '+this.credentials);

        this.jwtPayload = {
            "iss": "did:alastria:quorum:redt:QmeeasCZ9jLbX...ueBJ7d7csxhb",
            "aud": "did:alastria:quorum:redt:QmeeasCZ9jLbX...ueBJ7d7csxhb",
            "iat": 1525465044,
            "vp": {
                "@context": [
                    "https://www.w3.org/2018/credentials/v1",
                    "JWT"
                ],
                "type": ["VerifiablePresentation", "AlastriaVPTicket"],
                "proc": "H398sjHd...kldjUYn475n",
                // base64url-encoded JWT as string
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
        // let privatekey = fs.readFileSync("src/PEM/privateKyudo.pem");
        let privatekey=localStorage.getItem('privateKey');
        let publickey=localStorage.getItem('privateKey');
        //let jwt = require("jsonwebtoken");
        //let token = jwt.sign(this.jwtPayload, pk , {header: this.headerJwt, algorithm: "ES256"});

        let tokenToSign= new this.jsontokens.TokenSigner('ES256k', privatekey).sign(this.jwtPayload, true, this.headerJwt);
        console.log('token to sign: ', tokenToSign);

        let verify= new this.jsontokens.TokenVerifier('ES256k', publickey ).verify(tokenToSign);
        console.log('is the token verified?: ', verify);

        //console.log(token);
        return tokenToSign;
    }

    showIdentity() {
        this.navCtrl.push(Activity, {cred:this.credentialDecripted})
    }

}
