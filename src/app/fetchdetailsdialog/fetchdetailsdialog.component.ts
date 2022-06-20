import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {SecurityDetails} from '../SecurityDetails';

@Component({
  selector: 'app-fetchdetailsdialog',
  templateUrl: './fetchdetailsdialog.component.html',
  styleUrls: ['./fetchdetailsdialog.component.css']
})
export class FetchdetailsdialogComponent {

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<FetchdetailsdialogComponent>
   
) { }
  loanAccountNo: SecurityDetails[];
  checked: boolean = false;
   displayedColumns: string[] = ['secu_srl_num', 'foracid', 'terminationdate'];
  dataSource : SecurityDetails[];
  showProceed: boolean = false;



    


  ngOnInit(): void {
    this.dataSource = this.data.loanAccountNo;
    if(this.data.status === "ELIGIBLE") this.showProceed = true;
    console.log("datasource"+this.dataSource)
  }

  proceed():void {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: false });
  }

  cancel() {
    this.dialogRef.close({ data: true });
  }

}
