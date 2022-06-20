import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-areyousuredialog',
  templateUrl: './areyousuredialog.component.html',
  styleUrls: ['./areyousuredialog.component.css']
})
export class AreyousuredialogComponent implements OnInit {

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<AreyousuredialogComponent>
   
) { }

  ngOnInit(): void {
  }

  proceed():void {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: true });
  }

  cancel() {
    this.dialogRef.close({ data: false });
  }

}
