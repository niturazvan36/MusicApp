import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { CacheService } from '../../services/cache.service';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth.service';
import { LikeshowComponent } from '../likeshow/likeshow.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToplaylistComponent } from '../toplaylist/toplaylist.component';
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
played = false;
private intervalId: any;
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
    private spotify: SpotifyService,
    public likeBar: MatSnackBar) { }

  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }
  ngOnInit(): void {
    this.played = false;
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
    this.likeBar.openFromComponent(LikeshowComponent, {
      duration: 900,
    });
  }




  // play() {
  //   const songUri = 'https://open.spotify.com/track/227N0C668UQBiN3T4HFzoQ'; // Replace with your desired song URI
  //   this.spotify.playSong(songUri);
  // }
  playPopular(i: number){

    this.first= false;
    this.play_popular = [0, 0, 0, 0];
    this.play_popular[i] = 1;

    const song: Song = {
      img: this.songs[i].img,
      name: this.songs[i].name,
      artist: this.songs[i].artist,
      time: this.songs[i].time,
      album: "album"
    };
    localStorage.removeItem('song');
    localStorage.setItem('song', JSON.stringify(song));

    const songData = localStorage.getItem('song');
    if (songData) {
      this.song = JSON.parse(songData);
      console.log(this.song);
      console.log(this.song.img); // Accessing the img property
    }
  }

  navigateTo(path: string): void{
    //this.router.navigate([this.router.url])
    this.router.navigate([path])
  }

get displayTime(): string {
  const minutes = Math.floor(this.value / 60);
  const seconds = this.value % 60;
  return `${this.pad(minutes)}:${this.pad(seconds)}`;
}

private pad(value: number): string {
  return value.toString().padStart(2, '0');
}

startTimer() {
  this.stopTimer(); // Ensure no other interval is running
  this.intervalId = setInterval(() => {
    if (this.value < this.max) {
      this.value += this.step;
    } else {
      this.stopTimer();
    }
  }, 1000); // Increase value every second
}

stopTimer() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

play(){
  if(this.played === true)
    {
      this.played = false;
      this.stopTimer()
      // if (this.intervalId) {
      //   clearInterval(this.intervalId);
      //   this.intervalId = null;
      // }
    }
  else {
    this.played = true;
    this.startTimer()
    // this.intervalId = setInterval(() => {
    //   if (this.value < this.max) {
    //     this.value += this.step;
    //   }
    // }, 100); // Adjust the interval time as needed
  }
}
toPlaylist(){
  let dialogRef = this.dialog.open(ToplaylistComponent, {width: '32%'})
  dialogRef.afterClosed().subscribe(res => {
    const result = res.data
    console.log(res)
  })
}
}