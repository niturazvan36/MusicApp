import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export class SongsComponent implements OnInit {
  
  item: any;
  disabled = false;
  max = 1000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

play_popular:number[] = [1, 0, 0, 0];
likedSongs:string[] = ["Hip-Hop","Punk","Rock","Alternative","Indie","Latin","Classical","Jazz","Soul","Blues","Hip-Hop","Punk","Rock","Alternative","Indie","Latin","Classical","Jazz","Soul","Blues"];

myList: string[] = [];
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private http:HttpClient) { }

  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }
  ngOnInit(): void {
    this.item = this.route.snapshot.paramMap.get('item') || '';
    console.log(this.item)

      this.http
      .get('../../../assets/random/'+this.item+'_Track ID.txt', { responseType: 'text' })
      .subscribe((data) => {
        console.log(data);

        this.myList = data.split('\n').map(item => item.trim()).filter(item => item.length > 0);
      });

  }
}