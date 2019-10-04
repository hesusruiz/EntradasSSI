import {Injectable} from "@angular/core";



@Injectable()
export class AuthServiceService {

    //jwtHelper: JwtHelper = new JwtHelper();
    token;

    constructor() {

        const jwtBuilder = require('jwt-builder');

        this.token = jwtBuilder({
            algorithm: 'ES256',
            iss: 'did:alastria:quorum:redt:1111',
            sub: 'did:alastria:quorum:redt:345',
            iat: 1525465,
            exp: 1525465,
            nbf: 1525465,
            vc:[
                {
                    credentialSubject:{
                        urlServer: '',
                        apellido: 'Guerrero',
                        dateGeneration: '2019-10-02',
                        levelOfAssurance: 'Basic',
                        nombre: 'Nil',
                        email: 'nil.guerrero@in2.es',
                        tickedId: 'tejfqjjdqw'
                    },
                    type:[
                        'VerifiableCredential',
                        'AlastriaExampleCredential'
                    ],
                    '@context':[
                        'https://www.w3.org/2018/credentials/v1',
                        'JWT'
                    ]
                }
            ]

        });


    }

    getToken(){
        return this.token;
    }
}
