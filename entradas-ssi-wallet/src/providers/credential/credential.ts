import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SessionSecuredStorageService} from "../../services/securedStorage.service";

/*
  Generated class for the CredentialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CredentialProvider {

    private _id:string;
    private _issuer: string;
    private _name: string;
    private _isActive: boolean;
    private _issueDate: string;
    private _expireDate: string;
    private _level: number;


    constructor(id:string, issuer: string, name: string, isActive: boolean, issueDate: string,
                expireDate: string, level: number) {

        this._id=id;
        this._issuer = issuer;
        this._name = name;
        this._isActive = isActive;
        this._issueDate = issueDate;
        this._expireDate = expireDate;
        this._level = level;

    }


    get issuer(): string {
        return this._issuer;
    }

    set issuer(value: string) {
        this._issuer = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }

    get issueDate(): string {
        return this._issueDate;
    }

    set issueDate(value: string) {
        this._issueDate = value;
    }

    get expireDate(): string {
        return this._expireDate;
    }

    set expireDate(value: string) {
        this._expireDate = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }
}
