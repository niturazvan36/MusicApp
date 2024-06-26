import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {
  constructor(public dialog: MatDialog,
    private router: Router
  ) { }
  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }
  genres:string[] = ["Hip-Hop","Punk","Rock","Alternative","Indie","Latin","Classical","Jazz","Soul","Blues"];

  openSongs(item: string) {
    this.router.navigate(['/genres', item]);
  }

}
