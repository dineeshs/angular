import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorage } from './TokenStorage';


@Injectable()
export class LoginAuthGuard implements CanActivate {

    constructor( public router: Router, public token: TokenStorage) { }

    canActivate(): boolean {

        if (this.token.getToken() !== null || this.token.getToken() !== "" || this.token.getToken() != "AuthToken") {
            this.router.navigate(['/cancel']);
            return false;
        } 
        return true;
    }
}