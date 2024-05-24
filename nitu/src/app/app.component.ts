import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, withDebugTracing } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog'
import { RequestsService } from './services/requests.service';
import { CacheService } from './services/cache.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit{
 
  logname_register: any;
  logemail_register: any;
  logpass_register: any;

  logpass_login: any;
  logemail_login: any;
  constructor(private spotifyService: RequestsService,
    private router: Router,
    private cservice: CacheService
  ) { }
  ngOnInit(): void {

  }
  addItem() {
    this.spotifyService.addUser({ username: this.logname_register, email: this.logemail_register, password: this.logpass_register })
      .subscribe(response => {
        console.log('Item added successfully', response);

        const user = { username: response.username, email: this.logemail_login };
        this.cservice.setItem('user', user);
        console.log(response.username)
    
        this.router.navigate(['/home']);
      }, error => {
        console.error('Error adding item', error);
        this.router.navigate(['/home']);
      });
  }

  checkUser() {
    this.spotifyService.getUser({ email: this.logemail_login, password: this.logpass_login })
      .subscribe(response => {
        console.log('Item added successfully', response);


        const user = { username: response.username, email: this.logemail_login };
    this.cservice.setItem('user', user);
    console.log(response.username)

    this.router.navigate(['/home']);
      }, error => {
        console.error('Error adding item', error);

        this.router.navigate(['/home']);
      });
  }
}
