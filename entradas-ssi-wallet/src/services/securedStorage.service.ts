import {Injectable} from '@angular/core';
import {SecureStorage, SecureStorageObject} from '@ionic-native/secure-storage';
import {Platform} from 'ionic-angular';
import {CredentialProvider} from "../providers/credential/credential";
import {Storage} from "@ionic/storage";

@Injectable()
export class IdentitySecuredStorageService {

    securedStorageObject: SecureStorageObject;

    constructor(
        private securedStorage: SecureStorage,
        private platform: Platform
    ) {
        this.platform.ready().then(() => {
            this.initSecureStorage();
        });
    }

    private initSecureStorage() {
        this.securedStorage.create('identitySecureStorage')
            .then(
                (secStoObj: SecureStorageObject) => {
                    this.securedStorageObject = secStoObj;
                    console.log("IdentitySecureStorage ready");
                }
            );
    }

    async getKeys() {
        return this.securedStorageObject.keys();
    }

    async hasKey(key: string) {
        let keyExists = false;
        return this.securedStorageObject.keys()
            .then(result => {
                keyExists = result.some(k => {
                    return k === key
                });
                console.log(keyExists);
                return keyExists;
            });
    }

    async set(key: string, value: string) {
        return this.securedStorageObject.set(key, value);
    }

    async setJSON(key: string, value: any) {
        const jsonTmp = JSON.stringify(value);
        return this.securedStorageObject.set(key, jsonTmp);
    }

    async get(key: string) {
        return this.securedStorageObject.get(key);
    }

    async getJSON(key: string) {
        const jsonTmp = await this.securedStorageObject.get(key);
        return JSON.parse(jsonTmp);
    }

    async removeJson(key: string) {
        return this.securedStorageObject.remove(key);
    }

    async matchAndGetJSON(key: string) {
        let regex = new RegExp(key);
        let allKeys;
        let matchingKeys = new Array<string>();

        return this.getKeys()
            .then(result => {
                allKeys = result;

                for (let i = 0; i < allKeys.length; i++) {
                    if (regex.test(allKeys[i])) {
                        matchingKeys.push(allKeys[i]);
                    }
                }
                let jsonTmp = [];

                for (let z = 0; z < matchingKeys.length; z++) {
                    jsonTmp.push(this.securedStorageObject.get(matchingKeys[z]));
                }

                return Promise.all(jsonTmp);
            });
    }

    async matchPartiallyAndGetJSON(key: string) {
        let allKeys;
        let matchingKeys = new Array<string>();
        let jsonTmp = [];

        let words = key.split(" ");

        return this.getKeys()
            .then(result => {
                allKeys = result;

                for (let z = 0; z < 2; z++) {
                    let regex;
                    switch (z) {
                        case 0:
                            regex = new RegExp(key);
                            break;
                        case 1:
                            regex = new RegExp(words[words.length - 1]);
                            break;
                    }

                    let indexToSplice = new Array<Number>();
                    let count = 0;
                    for (let i = 0; i < allKeys.length; i++) {
                        if (regex.test(allKeys[i])) {
                            matchingKeys.push(allKeys[i]);
                            indexToSplice.push(i - count);
                            count++;
                        }
                    }
                    for (let i = 0; i < indexToSplice.length; i++) {
                        allKeys.splice(indexToSplice[i], 1);
                    }

                }
                for (let z = 0; z < words.length; z++) {
                    let regex;
                    if (words[z].length > 3) {
                        regex = new RegExp(words[z]);

                        for (let i = 0; i < allKeys.length; i++) {
                            if (regex.test(allKeys[i])) {
                                matchingKeys.push(allKeys[i]);
                            }
                        }
                    }

                }
                console.log(matchingKeys);

                for (let z = 0; z < matchingKeys.length; z++) {
                    jsonTmp.push(this.securedStorageObject.get(matchingKeys[z]));
                }

                return Promise.all(jsonTmp);
            })
    }
}

@Injectable()
export class SessionSecuredStorageService {

    securedStorageObject: SecureStorageObject;
    promiseState: Promise<any>;


    constructor(
        private securedStorage: SecureStorage,
        private platform: Platform,
        private storageSQLite:Storage
    ) {
        this.platform.ready().then(() => {
            this.initSecureStorage();
            console.log("SessionSecureStorage ready");
        });
    }

    private initSecureStorage() {
        this.securedStorage.create('sessionSecureStorage').then(
            (securedStorageObject) => {
                this.storageSQLite.set('SqlCreated','yes');
                this.securedStorageObject = securedStorageObject;
            }
        );
    }

    async isRegistered() {
        return new Promise(
            (resolve, reject) => {
                if (!this.storageSQLite.get('SqlCreated')) {
                    this.securedStorage.create('sessionSecureStorage').then(
                        (securedStorageObject) => {
                            this.securedStorageObject = securedStorageObject;
                            this.getUsername().then(
                                (result) => {
                                    if (result) {
                                        resolve(result);
                                    } else {
                                        reject('No esta registrado, hay que crear una cuenta nueva');
                                    }
                                }
                            );
                        }
                    )
                } else {
                    this.getUsername().then(
                        (result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject('No esta registrado, hay que crear una cuenta nueva');
                            }
                        }
                    );
                }
            }
        )
    }

    getUsername() {
        return this.storageSQLite.get('username');
    }

    getEmail(): Promise<any> {
        return this.storageSQLite.get('email');

    }

    getTicketId(): Promise<any> {
        return this.storageSQLite.get('ticketId');

    }

    saveUserData(data: string[]){
        this.storageSQLite.set('userData', JSON.stringify(data));
    }

    async checkPassword(username: string, password: string) {
        const passwordSto = await this.storageSQLite.get('password');

        return password === passwordSto;
    }

    saveCredential(id:string,credential: CredentialProvider): Promise<any> {
        return new Promise(
            (resolve, reject)=>{
                this.storageSQLite.set('credential'+id,JSON.stringify(credential));
            }
        )
    }

    register(username: string, password: any, email: string, ticketId: string): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                this.getUsername().then(
                    (res) => {
                        const isRegistered = res !== null;

                        this.storageSQLite.set('username', username).then(
                            (result) => {
                                this.storageSQLite.set('password', password).then(
                                    (result) => {
                                        //  resolve();
                                        this.storageSQLite.set('email', email).then(
                                            (result) => {
                                                this.storageSQLite.set('ticketId', ticketId).then(
                                                    (result) => {
                                                        resolve();
                                                    }
                                                )
                                            }
                                        )
                                    })
                            })

                    }
                );
            }
        )
    }

    saveURLjwt(value: any) {
        this.securedStorageObject.set('urlJWT', value);
    }


    getUrlJWT(){
        return this.securedStorageObject.get('urlJWT');
    }
}
