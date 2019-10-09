import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
import {Base64} from 'js-base64';
import {Activity} from "../tabsPage/activity/activity";
import {SecureStorage} from "@ionic-native/secure-storage";


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

    headerJwt = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": "did:ala:quor:redt:QmeeasCZ9jLbX...ueBJ7d7csxhb#keys-1",
    };

    jwtPayload;

    constructor(public navCtrl: NavController, public navParams: NavParams, private localStorage:SecureStorage) {
        this.user = navParams.get('user');

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
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ShowIdentityPage');
    }

    generateToken() {
        // let privatekey = fs.readFileSync("src/PEM/privateKyudo.pem");
        let jwt = require("jsonwebtoken");
        let token = jwt.sign(this.jwtPayload, "-----BEGIN EC PRIVATE KEY-----\n" +
            "MHcCAQEEIOGmCHtuD1qiO1Yv8ZDkFWBgpkd3EuvMTuOEt6v6ZPfSoAoGCCqGSM49\n" +
            "AwEHoUQDQgAEqAExAPBmINIPQYLy7beBiWsYAJiQyLnTGxraX57Ydkq83GcIWy3u\n" +
            "Y41PuQR4zUfYln8HGGeyssPRrxEGMSXidQ==\n" +
            "-----END EC PRIVATE KEY-----", {header: this.headerJwt, algorithm: "ES256"});

        console.log(token);
        return token;
    }

    showIdentity() {
        this.navCtrl.push(Activity, {cred:this.credentialDecripted})
    }

}
