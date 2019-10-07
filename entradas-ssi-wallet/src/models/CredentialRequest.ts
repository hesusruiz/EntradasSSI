/**TODO: Añadir la public key ya generada*/
export class HeaderUserRequest{
    kid: "did:ala:quor:redt:345#keys-1";
    typ: "JWT";
    alg: "ES256";
    vc : VerifiableCredential[];
}
export class CredentialRequest {
    iss: "did:alastria:quorum:redt:1111";
    sub: "did:alastria:quorum:redt:345";
    iat: 1525465;
    exp: 1525465;
    nbf: 1525465;
}
export class VerifiableCredential{
    credentialSubject: CredentialSubject;
}
export class CredentialSubject{
    urlServer: string;
    apellido: string;
    dateGeneration: Date;
    levelOfAssurance:"Basic";
    nombre:string;
    email:string;
    ticketId: string;
    type: Type;
    context: Context;
}
export class Type {
    verifiableCredential:  "VerifiableCredential";
    alastriaExample:  "AlastriaExampleCredential";
}
export class Context{
    urlContext: "https://www.w3.org/2018/credentials/v1";
    jwt: "JWT";
}
