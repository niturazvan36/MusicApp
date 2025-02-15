import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CacheService } from '../../services/cache.service';
import { RequestsService } from '../../services/requests.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

interface Song{
  img:string;
  name:string;
  artist:string;
  time:string;
  album:string;
}


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
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

myList: any[] = [1, 0, 0, 0];

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private spotifyService: RequestsService,
    private router: Router,
    private cservice: CacheService) { }
  ngOnInit(): void {

    this.user = this.cservice.getItem('user');
    this.item = this.route.snapshot.paramMap.get('item') || '';
    console.log(this.item)
    this.spotifyService.getTrack('5Tbpp3OLLClPJF8t1DmrFD')
    .subscribe((res: any) => {
      let song: Song = {
        img:res.album.images[2].url,
        name:res.name,
        artist:res.artists[0].name,
        time:msToMinutesSeconds(res.duration_ms),
        album:res.album.name
      }
        this.songs.push(song)
    });
  }


  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }

}
function msToMinutesSeconds(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format seconds to be always two digits
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
}