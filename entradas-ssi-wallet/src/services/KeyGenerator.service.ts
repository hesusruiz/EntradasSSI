import {Injectable} from "@angular/core";
import {Base64} from 'js-base64';
import {Elliptic} from 'elliptic'
import {SecureStorage} from "@ionic-native/secure-storage";


@Injectable()
export class KeyGeneratorService {


    constructor( private localstorage: SecureStorage) {
    }

    generatePublicPrivateKey() {
        let EC = require('elliptic').ec;

        let ec = new EC('secp256k1');

        let key = ec.genKeyPair();
        console.log("KEY---------->", key);

       // let copy=ec.keyFromPrivate(key.getPrivate('hex'),'hex');
       //  console.log(key.getPublic().x +'+'+ key.getPublic().y);
       //  console.log('Copy= '+copy);

        let pubKey = key.getPublic('hex');
        let privKey = key.getPrivate('hex');
        localStorage.setItem('privateKey', privKey);

        console.log("Pub Key original --->" + pubKey);
        console.log("Priv Key original --->" + privKey);
        // let encodedKey = Base64.encode(pubKey);
        // console.log("Key base64--_>" + encodedKey);
        // console.log("Key original decoded -->" + Base64.decode(encodedKey));
        // return encodedKey;
    }
}
