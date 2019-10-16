import {Injectable} from "@angular/core";
import {Base64} from 'js-base64';
import {decodeToken} from 'jsontokens';
import {encodeToken} from 'jsontokens';
import {SecureStorage} from "@ionic-native/secure-storage";


@Injectable()
export class KeyGeneratorService {

    elliptic = require('elliptic');
    jsontokens = require('jsontokens');
    jwt = require("jsonwebtoken");
    ecurve = new this.elliptic.ec('secp256k1');

    genKey(){
        let keypair = this.ecurve.genKeyPair();
        localStorage.setItem('keyPair', keypair);
        let key = keypair.getPrivate().toString('hex');

        localStorage.setItem('privateKey', key);

        let prefix = '0'.repeat(64 - key.length);
        let public1 = keypair.getPublic().encode('hex');
        localStorage.setItem('publicKey',public1);

        console.log("key privada----"+key);
        console.log("key publica----"+public1);


        return {private: `${prefix}${key}`, public1}
    };

    constructor( private localstorage: SecureStorage) {

    }



}
