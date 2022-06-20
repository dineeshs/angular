import { Injectable } from '@angular/core';
import { HptInputDetailsComponent } from './hpt-input-details/hpt-input-details.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginResponse} from './LoginResponse';
import {LoginRequest} from './LoginRequest';
import { Router } from '@angular/router';
import {TokenStorage} from './TokenStorage';
import {SpinnerService} from './SpinnerService';
import {SecurityDetails} from './SecurityDetails';
import {Observable} from 'rxjs';
import {PendingRequests} from './PendingRequests';
import {MatDialog} from '@angular/material/dialog';
import {ErrordialogComponent} from './errordialog/errordialog.component';
import {CancellationResponse} from './CancellationResponse';
import {SecurityResponse} from './SecurityResponse';
import {HypothecationModel} from './HypothecationModel';


@Injectable({
  providedIn: 'root'
})
export class FetchDetailsServiceService {

  public isLoggedIn: boolean = false;
  public loginRequest: LoginRequest = new LoginRequest();
  public tokenDetails: LoginResponse;
  public securityDetails: SecurityDetails[];
  public hypothecationModel: HypothecationModel;
  userRole: string = "";

  private requestHypothecationCancelServiceUrl: string = "http://localhost:8087/requestHypothecationCancel";
  private loginServiceUrl: string = "http://localhost:8087/login";
  private fetchDetailsUrl: string = "http://localhost:8087/getLoanDetails";
  private fetchPendingRequestsUrl: string = "http://localhost:8087/fetchPendingRequests";
  private validationUrl: string = "http://localhost:8087/validate";
  private cancelHypothecationUrl: string = "http://localhost:8087/cancelHypothecation";
  private fetchCompletedRequestsUrl: string = "http://localhost:8087/fetchCompletedRequests";
  private rejectUrl: string = "http://localhost:8087/reject";

  constructor(public dialog: MatDialog,private http: HttpClient, private router: Router, private token: TokenStorage, private spinnerService: SpinnerService) {
    this.isLoggedIn = false;

   }

   createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Bearer ' +
     this.token.getToken); 
     return headers;
     
  }


  public  requestHypothecationCancelService(request) {
    request.solid = this.token.getSolid();
    request.maker = this.token.getAdName();
    request.makerscale = this.token.getScale();
    console.log(this.token.getSolid());
     return this.http.post<CancellationResponse>(this.requestHypothecationCancelServiceUrl, request);
   }

   public loginService(username, password) {
     this.spinnerService.activate();
     this.loginRequest.username = username;
     this.loginRequest.password = password;
     this.http.post<LoginResponse>(this.loginServiceUrl, this.loginRequest).subscribe(

      data => {


        this.tokenDetails = data;
        
        if(this.tokenDetails.role === "EXCEPTION")
        {

          const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': 'We could not process your request. Contact admin. '}
        });
          console.log("exception")
          this.spinnerService.deactivate();

        }

        else if(this.tokenDetails.role === "FAILURE")
        {

          const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': 'Invalid username/password.'}
        });
          console.log("exception")
          this.spinnerService.deactivate();

        }
        else {
          this.token.saveToken(this.tokenDetails.token);
        this.token.saveSolid(this.tokenDetails.solid);
          this.userRole = this.tokenDetails.role;
          this.token.saveRole(this.tokenDetails.role);
          this.token.saveAdName(this.tokenDetails.adname);
          this.token.saveScale(this.tokenDetails.scale);
        this.isLoggedIn = true;
        this.router.navigate(['/cancel']);
        this.spinnerService.deactivate();
        }
        

      },
      error =>  {
        this.spinnerService.deactivate(); }
    );
  }

  public fetchDetails(hypothecationModel) {
    this.spinnerService.activate();
    console.log("inside fetch details service")
    return this.http.post<SecurityResponse>(this.fetchDetailsUrl, hypothecationModel);
    // .subscribe(
    //   data => {
    //     console.log("data"+data)
    //     this.securityDetails = data;
    //     this.spinnerService.deactivate();
    //   },
    //   error => {
    //     this.spinnerService.deactivate();
    //     console.log(error)
    //     this.securityDetails = null;
    //   });
  }

  public fetchPendingRequests(hypothecationModel) {
    hypothecationModel.solid = this.token.getSolid();
    
    return this.http.post<PendingRequests[]>(this.fetchPendingRequestsUrl, hypothecationModel);
  }

  public fetchCompletedRequests(hypothecationModel) {
    hypothecationModel.solid = this.token.getSolid();
    return this.http.post<HypothecationModel[]>(this.fetchCompletedRequestsUrl, hypothecationModel);
  }

  public fetchCancellationDetails(referenceNum) {
    //return this.http.post<>();
  }


  public validateDetails(hypothecationModel) {
    return this.http.post<CancellationResponse>(this.validationUrl, hypothecationModel);
  }

  public cancelHypothecation(hypothecationModel) {
    hypothecationModel.checker = this.token.getAdName();
    hypothecationModel.checkerscale = this.token.getScale();
    return this.http.post<CancellationResponse>(this.cancelHypothecationUrl, hypothecationModel);
  }

  public reject(hypothecationModel) {
    hypothecationModel.checker = this.token.getAdName();
    hypothecationModel.checkerscale = this.token.getScale();


    return this.http.post<CancellationResponse>(this.rejectUrl, hypothecationModel);
  }

   


}
