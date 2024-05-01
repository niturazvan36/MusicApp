import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';
import { CacheService } from '../../services/cache.service';

interface Song{
  img:string;
  name:string;
  artist:string;
  time:string;
  album:string;
}


@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrl: './liked-songs.component.css'
})
export class LikedSongsComponent implements OnInit {

  first=true;
  song:any;
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


user:any;

myList: any[] = [];

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private spotifyService: RequestsService,
    private router: Router,
    private cservice: CacheService) { }
  ngOnInit(): void {

    this.user = this.cservice.getItem('user');
    this.getLikedSongs(this.user.username)
  }
  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }
  getLikedSongs(username:string){
    

    this.spotifyService.getLikedSongs({ username: this.user.username})
    .subscribe(response => {
        console.log(response)
        this.songs = response.songs;
        
        for (let index = 0; index < this.songs.length; index++) 
          {
            this.myList.push( this.songs[index])
            this.demo_img = this.songs[4].song_img
          }
          


    }, error => {
      console.error('Error adding item', error);
    });
  }

}
