import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the CredentialRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CredentialRequestProvider {

    constructor(public http: HttpClient) {
        console.log('Hello CredentialRequestProvider Provider');
    }

    requestCredential(
        did: string, email: string, name: string, surname: string, ticketId: string
    ) {

        // let headers: HttpHeaders = new HttpHeaders();
        // headers.append('Access-Control-Allow-Origin' , '*');
        // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        // headers.append('Accept','application/json');
        // headers.append('content-type','application/json');
        // headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        // let body = {
        //
        // };

        this.http.post('http://10.14.3.80:8080/api/v1/credential/', {
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

    getJWT(uuid: string) {

        this.http.get('http://10.14.3.80:8080/api/v1/credential/' + uuid)
            .subscribe((result: any) => {
                console.log(result);
            }, (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            });
    }

}
