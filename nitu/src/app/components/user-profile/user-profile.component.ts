import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  user:any;
 constructor(@Inject(MAT_DIALOG_DATA) public data:any,
private dialogRef: MatDialogRef<UserProfileComponent>,
private cservice: CacheService){}

ngOnInit(): void {
 this.user = this.cservice.getItem('user');
}
}
