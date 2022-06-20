import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { FetchdetailsdialogComponent } from "../fetchdetailsdialog/fetchdetailsdialog.component";
import { FetchDetailsServiceService } from "../fetch-details-service.service"
import { AreyousuredialogComponent } from "../areyousuredialog/areyousuredialog.component";
import { HypothecationModel } from "../HypothecationModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SecurityDetails} from '../SecurityDetails';
import {PendingRequests } from '../PendingRequests';
import {SpinnerService} from '../SpinnerService';
import {ErrordialogComponent} from '../errordialog/errordialog.component';
import {CheckerdialogComponent} from '../checkerdialog/checkerdialog.component';
import {CancellationResponse} from '../CancellationResponse';
import { MatTableDataSource } from '@angular/material/table';
import {SecurityResponse} from '../SecurityResponse';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-hpt-input-details',
  templateUrl: './hpt-input-details.component.html',
  styleUrls: ['./hpt-input-details.component.css']
})
/** Error when invalid control is dirty, touched, or submitted. */
export class HptInputDetailsComponent  {
  ELEMENT_DATA: PendingRequests[] = [
  
];
activeSpinner: boolean = false;
  apiResponse: CancellationResponse = new CancellationResponse();
  loanAccountNo: string = "";
  registrationNo: string = "";
  chassisNo: string = "";
  terminationDate: string = "";
  referenceNo: string = "";
  disableSubmitForCancellation: boolean = true;
  hypothecationModel: HypothecationModel = new HypothecationModel();
  securityDetails: SecurityDetails[];
  securityResponse: SecurityResponse;
  panelOpenState = false;
  pendingRequests: PendingRequests[];
   displayedColumns: string[] = ['no', 'chassisno', 'loanaccountno', 'action'];
   displayedColumnsNew: string[] = ['no','referenceno', 'solid', 'loanaccountno', 'chassisno', 'registrationno', 'maker',
   'makerdate', 'checker', 'checkerdate', 'vahanresponse'];
  dataSource = new MatTableDataSource<PendingRequests>();
  completedDataSource = new MatTableDataSource<HypothecationModel>();
  role: string;
  showTerminationDate: boolean = false;
  constructor(public dialog: MatDialog, public service: FetchDetailsServiceService, private http: HttpClient, private spinnerService : SpinnerService) {
    this.spinnerService.spinnerActive.subscribe(active => 
     this.toggleSpinner(active)); 
     this.role = this.service.userRole;
  }
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    openDialog(details: SecurityDetails[], status: string) {
      this.disableSubmitForCancellation = true;
      const dialogRef = this.dialog.open(FetchdetailsdialogComponent, {
            
            data :{'loanAccountNo': details, 'status': status}
        });

    dialogRef.afterClosed().subscribe(result => {
      this.disableSubmitForCancellation = result.data;
    });
  }

  submitForCancellation() {
    const dialogRef = this.dialog.open(AreyousuredialogComponent, {
            
        });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result.data === true) {
        this.spinnerService.activate();
        this.hypothecationModel.regnNo = this.registrationNo;
        this.hypothecationModel.chassisNo = this.chassisNo;
        this.hypothecationModel.terminationDt=  this.terminationDate;
        this.hypothecationModel.foracid = this.loanAccountNo;
       // this.hypothecationModel.solid = this.token.
        this.service.requestHypothecationCancelService(this.hypothecationModel).subscribe(
      data=> {
        this.apiResponse = data;
        console.log("insertmethodapi"+this.apiResponse);
        
        if(this.apiResponse.response === "success") {
          this.hypothecationModel = new HypothecationModel();
          this.registrationNo = "";
          this.chassisNo="";
          this.terminationDate="";
          this.loanAccountNo="";
          this.disableSubmitForCancellation = true;
          const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': 'Successful. Request forwarded to checker.'}
        });
        } else
 {
   const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': 'Request failed. Please try again/ contact admin.'}
        });
 }        
        this.spinnerService.deactivate();
      },
      error=> {
        console.log("insertmethodapieror"+error)
        const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': 'Request failed. Please try again/ contact admin.'}
        });
        this.spinnerService.deactivate();
      }
    );
      
      
      }
    });


  }

  editDetails() {
    this.disableSubmitForCancellation = true;
  }

  fetchDetails() {
    console.log("inside fetch details hpt input details")
    this.hypothecationModel.foracid = this.loanAccountNo;
    this.service.fetchDetails(this.hypothecationModel).subscribe(
      data=> {
        console.log("data received from service:" +data)
        this.securityResponse = data;
        this.securityDetails = this.securityResponse.securityDetails;
        this.spinnerService.deactivate();
        if(this.securityResponse.status === "NODATAFOUND")
        {
          const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': 'No record found with the given details/ Loan account still active.'}
        });
        }
        else
        this.openDialog(this.securityDetails, this.securityResponse.status)
      },
      error=>{
        console.log("error"+error);
        this.spinnerService.deactivate();
      }
    );
    
    
  }

  fetchPendingRequests() {
    this.spinnerService.activate();
    this.service.fetchPendingRequests(this.hypothecationModel).subscribe(
      data=> {
        console.log(data);
        this.dataSource.data = data;
        //this.pendingRequests = data;
        console.log("pendingRequests"+this.pendingRequests)
        //this.ELEMENT_DATA = data;
        console.log(this.ELEMENT_DATA);
        this.spinnerService.deactivate();

      },error=> {
        console.log(error);
                this.spinnerService.deactivate();

      }
    );
  }

  tabClick(tabevent) {
     console.log('tab clicked')
      console.log(tabevent)
    if(tabevent.tab.textLabel === 'Pending Requests') {
      console.log('tab clicked')
      this.fetchPendingRequests();
    }
    if(tabevent.tab.textLabel === 'Completed Requests') {
      console.log('tab clicked')
      this.fetchCompletedRequests();
    }
  }

  clickCheckerCancellationDetails(referenceNo, foracid) {
    this.referenceNo = referenceNo;
    const dialogRef = this.dialog.open(CheckerdialogComponent, {
            
            data :{'referenceNo': this.referenceNo, 'foracid':foracid}
        });
  
        dialogRef.afterClosed().subscribe(result => {
          this.spinnerService.deactivate();
         
          const dialogRef = this.dialog.open(ErrordialogComponent, {
            
            data :{'data': result.data.data}
        });
        this.fetchPendingRequests();

        });

      

  }

  fetchCancellationDetails(referenceNo) {
    // this.service.fetchCancellationDetails(referenceNo).subscribe(
    //   data=> {

    //   },
    //   error => {

    //   }
    // );
  }

  fetchCompletedRequests() {
    this.service.fetchCompletedRequests(this.hypothecationModel).subscribe(
      data=>{
        this.completedDataSource.data  = data;
      },
      error=>{

      }
    )
  }

  toggleSpinner(active){
      this.activeSpinner = active
    }

}