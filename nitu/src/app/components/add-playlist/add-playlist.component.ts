import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CacheService } from '../../services/cache.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.css'
})
export class AddPlaylistComponent implements OnInit{

  user:any;
  playlistName:any;
 constructor(@Inject(MAT_DIALOG_DATA) public data:any,
private dialogRef: MatDialogRef<AddPlaylistComponent>,
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