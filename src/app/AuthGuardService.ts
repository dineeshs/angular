import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorage } from './TokenStorage';
import { FetchDetailsServiceService } from './fetch-details-service.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor( public router: Router, public token: TokenStorage, public service: FetchDetailsServiceService) { }

    canActivate(): boolean {

        console.log("can activate called");

        if (this.token.getToken() === null || this.token.getToken() === "" || this.service.isLoggedIn === false) {
            this.router.navigate(['/login']);
            return false;
        } 
        return true;
    }
}