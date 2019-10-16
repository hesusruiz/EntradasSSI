import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SecureStorage} from "@ionic-native/secure-storage";
import {SessionSecuredStorageService} from "../../services/securedStorage.service";

/*
  Generated class for the CredentialRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CredentialRequestProvider {

    constructor(public http: HttpClient, private secureStorage:SessionSecuredStorageService) {
        console.log('Hello CredentialRequestProvider Provider');
    }

    requestCredential(did: string, email: string, name: string, surname: string, ticketId: string) {
        this.http.post('https://des-blockcha.in2.es/api/v1/credential/', {
            did: did,
            email: email,
            nombre: name,
            apellido: surname,
            ticketId: ticketId
        })
            .subscribe((result: any) => {
                console.log(result);
            }, (errorResponse: HttpErrorResponse) => {
                console.error(errorResponse);
            });
    }

    getJWT() {
        console.log('RECUPERO LA URL: '+localStorage.getItem('urlVal'));
        return this.http.get('https://des-blockcha.in2.es/api/v1/credential' + localStorage.getItem('urlVal'));

    }

    postValidateDid(id, did) {
       return  this.http.post('https://des-blockcha.in2.es/api/v1/credential/did', {
            id: id,
            did: did
        });
    }

}
