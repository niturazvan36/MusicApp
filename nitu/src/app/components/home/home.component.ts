import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, withDebugTracing } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { subscribe } from 'diagnostics_channel';
import { RequestsService } from '../../services/requests.service';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  disabled = false;
  max = 1000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
popularList: Popular[] = [];
fanslikeList: FansLike[] = [];
play_popular:number[] = [1, 0, 0, 0];
  constructor(private http:HttpClient,
    private router: Router,
  public dialog: MatDialog,
  private spotifyService: RequestsService) { }

  ngOnInit(): void {

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
    this.play_popular = [0, 0, 0, 0];
    this.play_popular[i] = 1;
  }

  navigateTo(path: string): void{
    //this.router.navigate([this.router.url])
    this.router.navigate([path])
  }

 
openDialog(){
  let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
}
}
