import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';
import { CacheService } from '../../services/cache.service';
import { AddPlaylistComponent } from '../add-playlist/add-playlist.component';

interface Song{
  img:string;
  name:string;
  artist:string;
  time:string;
  album:string;
}


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  item: any;
  disabled = false;
  max = 1000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  demo_img:any;

play_popular:number[] = [1, 0, 0, 0];
songs:any[] = [];

genres:number[] = [1, 0, 0, 0,1, 0, 0, 0,1, 0, 0, 0];
user:any;

playlist:any[] = [];

myList: any[] = [];

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private spotifyService: RequestsService,
    private router: Router,
    private cservice: CacheService) { }
  ngOnInit(): void {

  }
  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }

  addPlaylist(){
    let dialogRef = this.dialog.open(AddPlaylistComponent, {width: '32%'})
    dialogRef.afterClosed().subscribe(res => {
      const result = res.data
      console.log(res)
      this.playlist.push(res.data)
    })
  }
}
