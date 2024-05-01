import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-toplaylist',
  templateUrl: './toplaylist.component.html',
  styleUrl: './toplaylist.component.css'
})
export class ToplaylistComponent implements OnInit{

  user:any;
  playlistName:any;
 constructor(@Inject(MAT_DIALOG_DATA) public data:any,
private dialogRef: MatDialogRef<ToplaylistComponent>,
private cservice: CacheService){}

ngOnInit(): void {
}

  confirm(){
    console.log(this.playlistName)
    if(this.playlistName)
    this.dialogRef.close({data: this.playlistName})
  else 
  this.dialogRef.close()


  }
}