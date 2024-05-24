import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {


  private tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', '63294338e7a441c0bae2d505c0ce9c6d')
      .set('client_secret', '6c8550581a9d481c95322713de996cf9');

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }

  getTrack(songId: string): Observable<any> {
    return new Observable((observer) => {
      this.getToken().subscribe(
        (response) => {
          const token = response.access_token;
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          this.http.get(`https://api.spotify.com/v1/tracks/${songId}?market=RO`, { headers }).subscribe(
            (trackResponse) => {
              observer.next(trackResponse);
              observer.complete();
            },
            (trackError) => {
              observer.error(trackError);
            }
          );
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getArtist(artistId: string): Observable<any> {
    return new Observable((observer) => {
      this.getToken().subscribe(
        (response) => {
          const token = response.access_token;
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          this.http.get(`https://api.spotify.com/v1/artists/${artistId}?market=RO`, { headers }).subscribe(
            (trackResponse) => {
              observer.next(trackResponse);
              observer.complete();
            },
            (trackError) => {
              observer.error(trackError);
            }
          );
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }


  private apiUrl = 'http://localhost:3000';

  addUser(item: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user`, item);
  }

  getUser(item2: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, item2);
  }
}
