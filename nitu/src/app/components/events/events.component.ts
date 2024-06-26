import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  constructor(public dialog: MatDialog) { }
  openDialog(){
    let dialogRef = this.dialog.open(UserProfileComponent, {width: '30%'})
  }
}
