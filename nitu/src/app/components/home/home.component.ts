import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, withDebugTracing } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { subscribe } from 'diagnostics_channel';
import { RequestsService } from '../../services/requests.service';
import { CacheService } from '../../services/cache.service';

interface Popular{
  img:string;
  name:string;
  artist:string;
  time:string;
}

interface FansLike{
  img:string;
  name:string;
}

interface Song{
  img:string;
  name:string;
  artist:string;
  time:string;
  album:string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  played = false;

  disabled = false;
  max = 30 * 30;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = false;
  value = 0;
  thumbLabel_volume= true;
  private intervalId: any;


  first= true;
  max_volume = 100;
  min_volume = 0;
  step_volume = 1;
  value_volume = 50;
popularList: Popular[] = [];
fanslikeList: FansLike[] = [];
play_popular:number[] = [0, 0, 0, 0];
myList: string[] = [];
song:any;
  constructor(private http:HttpClient,
    private router: Router,
  public dialog: MatDialog,
  private spotifyService: RequestsService,
  ) { }

  ngOnInit(): void {
   
    // this.http
    // .get('../../../assets/random/Rock_Track ID.txt', { responseType: 'text' })
    // .subscribe((data) => {
      

    //   this.myList = data.split('\n').map(item => item.trim()).filter(item => item.length > 0);
      
    //   for (let item of this.myList) {
    //     this.spotifyService.getTrack(item).subscribe((res: any) => {
    //       console.log(res)
    //       let song: Song = {
    //         img:res.album.images[2].url,
    //         name:res.name,
    //         artist:res.artists[0].name,
    //         time:msToMinutesSeconds(res.duration_ms),
    //         album:res.album.name
    //       }
    //         this.popularList.push(song)
    //     });
    //   }
    // });

    // function msToMinutesSeconds(milliseconds: number): string {
    //   const totalSeconds = Math.floor(milliseconds / 1000);
    //   const minutes = Math.floor(totalSeconds / 60);
    //   const seconds = totalSeconds % 60;
    
    //   // Format seconds to be always two digits
    //   const formattedSeconds = seconds.toString().padStart(2, '0');
    
    //   return `${minutes}:${formattedSeconds}`;
    // }

    this.played = false;
    this.addPopular('7iAqvWLgZzXvH38lA06QZg')
    this.addPopular('0SiywuOBRcynK0uKGWdCnn')
    this.addPopular('4EWCNWgDS8707fNSZ1oaA5')
    this.addPopular('7snQQk1zcKl8gZ92AnueZW')      

    this.addFansLike('0Y5tJX1MQlPlqiwlOH1tJY')  
    this.addFansLike('1Xyo4u8uXC1ZmMpatF05PJ')  
    this.addFansLike('6M2wZ9GZgrQXHCFfjv46we')  
    this.addFansLike('5WUlDfRSoLAfcVSX1WnrxN')

  }
  title = 'nitu';

  addPopular(songId:string){
this.spotifyService.getTrack(songId)
    .subscribe((res: any) => {
      let popular: Popular = {
        img:res.album.images[2].url,
        name:res.name,
        artist:res.artists[0].name,
        time:res.durations_ms
      }
        this.popularList.push(popular)
    });
    
  }

  addFansLike(artistId:string){


    this.spotifyService.getArtist(artistId)
    .subscribe((res: any) => {
      let fanslike: FansLike = {
        img:res.images[2].url,
        name:res.name
      }
        this.fanslikeList.push(fanslike)
    });
  }

  playPopular(i: number){

    this.first= false;
    this.play_popular = [0, 0, 0, 0];
    this.play_popular[i] = 1;

    const song: Song = {
      img: this.popularList[i].img,
      name: this.popularList[i].name,
      artist: this.popularList[i].artist,
      time: this.popularList[i].time,
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

 
openDialog(){
  let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
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
}
