import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
 constructor(@Inject(MAT_DIALOG_DATA) public data:any,
private dialogRef: MatDialogRef<UserProfileComponent>){}

ngOnInit(): void {
  
}
}
