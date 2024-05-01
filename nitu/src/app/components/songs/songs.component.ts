import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { CacheService } from '../../services/cache.service';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth.service';

interface Song{
  img:string;
  name:string;
  artist:string;
  time:string;
  album:string;
}


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export class SongsComponent implements OnInit {
  
user:any;

  item: any;
  disabled = false;
  max = 1000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;


  first=true;
  song:any;
play_popular:number[] = [1, 0, 0, 0];
songs:Song[] = [];

liked:any[] = [];

myList: string[] = [];
  constructor(private route: ActivatedRoute, 
    private authService: AuthService,
    public dialog: MatDialog,
    private http:HttpClient,
    private spotifyService: RequestsService,
    private router: Router,
    private cservice: CacheService,
    private spotify: SpotifyService) { }

  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }
  ngOnInit(): void {

    this.item = this.route.snapshot.paramMap.get('item') || '';
    console.log(this.item)

      this.http
      .get('../../../assets/random/'+this.item+'_Track ID.txt', { responseType: 'text' })
      .subscribe((data) => {
        

        this.myList = data.split('\n').map(item => item.trim()).filter(item => item.length > 0);
        
        for (let item of this.myList) {
          this.spotifyService.getTrack(item).subscribe((res: any) => {
            console.log(res)
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
      });



      function msToMinutesSeconds(milliseconds: number): string {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
      
        // Format seconds to be always two digits
        const formattedSeconds = seconds.toString().padStart(2, '0');
      
        return `${minutes}:${formattedSeconds}`;
      }
  }

  likeSong(song:Song){
    this.user = this.cservice.getItem('user');

    this.spotifyService.likeSong({ username: this.user.username, song_name: song.name,
       song_album: song.album, song_img: song.img, song_length: song.time })
    .subscribe(response => {
      console.log('Item added successfully', response);

    }, error => {
      console.error('Error adding item', error);
    });
  }




  play() {
    const songUri = 'https://open.spotify.com/track/227N0C668UQBiN3T4HFzoQ'; // Replace with your desired song URI
    this.spotify.playSong(songUri);
  }
}