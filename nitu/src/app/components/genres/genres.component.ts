import { Component } from '@angular/core';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {
  genres:string[] = ["Hip-Hop","Punk","Rock","Alternative","Indie","Latin","Classical","Jazz","Soul","Blues"];
}
