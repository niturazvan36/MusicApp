// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8888/login';
  private tokenUrl = 'http://localhost:8888/callback';
  private redirectUri = 'http://localhost:4200';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    window.location.href = this.authUrl;
  }

  handleCallback(code: string) {
    this.http
      .post<any>(this.tokenUrl, { code })
      .subscribe(data => {
        localStorage.setItem('spotify_access_token', data.access_token);
        this.router.navigate(['/']);
      });
  }

  getToken() {
    return localStorage.getItem('spotify_access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return token ? !jwtHelper.isTokenExpired(token) : false;
  }
}
