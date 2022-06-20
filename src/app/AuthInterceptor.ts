import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import {TokenStorage} from './TokenStorage';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrordialogComponent} from './errordialog/errordialog.component'
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, public dialog: MatDialog) {

  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
            const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': 'Session expired. Please login.'}
        });
            this.router.navigate(['/login']);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        }
        return null;
    }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("url-------------"+req.url)
const isApiUrl = req.url.startsWith("http://localhost:8087/login");
console.log(isApiUrl)
if(isApiUrl) return next.handle(req);
    const authReq = req.clone({
       headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.token.getToken()
    })
    });

    console.log('Intercepted HTTP call', authReq);

    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));;
  }
  
}