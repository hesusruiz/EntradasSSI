import {Injectable} from "@angular/core";
import {Base64} from 'js-base64';


@Injectable()
export class KeyGeneratorService {


    constructor() {
    }

    generatePublicPrivateKey() {
        let EC = require('elliptic').ec;

        // Create and initialize EC context
        // (better do it once and reuse it)
        let ec = new EC('secp256k1');

        // Generate keys
        let key = ec.genKeyPair();
        console.log("KEY---------->", key);

        let pubKey = key.getPublic();

        console.log("Key original --->" + pubKey.toString());

        let encodedKey = Base64.encode(pubKey);

        console.log("Key base64--_>" + encodedKey);

        console.log("Key original decoded -->" + Base64.decode(encodedKey));

        return encodedKey;
    }
}
