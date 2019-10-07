import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
import {Base64} from 'js-base64';


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

    headerJwt = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": "did:ala:quor:redt:QmeeasCZ9jLbX...ueBJ7d7csxhb#keys-1",
    };

    jwtPayload;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.user = navParams.get('user');

        let credentials = Base64.encode(this.user.ticketId);
        console.log('CREDENTIAL: '+credentials);

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
                "verifiableCredential": [credentials]
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
            "MHQCAQEEILI8IeZxN1DQskSvfl1rDnWp/9horl1xAwumWlk0fYejoAcGBSuBBAAK\n" +
            "oUQDQgAENF5lijsAeVDle1NLoOqt3w0yZ/4VAVBpO3rr6HCOCSDHD+DxirmR0BKW\n" +
            "YCoGtSiFSUeekSLkIeohUoxoMUTAng==\n" +
            "-----END EC PRIVATE KEY-----", {header: this.headerJwt, algorithm: "ES256"});

        return token;
    }

}
