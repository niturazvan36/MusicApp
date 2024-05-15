import { Component } from '@angular/core';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrl: './liked-songs.component.css'
})
export class LikedSongsComponent {
  likedSongs:string[] = ["Hip-Hop","Punk","Rock","Alternative","Indie","Latin","Classical","Jazz","Soul","Blues"];
}
