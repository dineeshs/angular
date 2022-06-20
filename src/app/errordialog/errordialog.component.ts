import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<ErrordialogComponent>
   
) { }


  ngOnInit(): void {
  }

}
