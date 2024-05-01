// spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private player: any;
  private token: string = 'BQAxYTfkYrLrEMHFZp76wy1ZbTNHdKnhk6lYaix0iQgxjSMcUQe-I-2mRq16A4ALyrxWSK2c3fEarBbkFQxfxyDHZhL4wC9hOt9qgHKfy8LOlIz1kE0'; // Replace with your actual token
  private deviceId: string = 'e75ad0b769883b15ba4362d22982b61f7458b3de'; // Use the provided device ID

  constructor(private http: HttpClient) {
    this.initializeSpotifyPlayer();
  }

  private initializeSpotifyPlayer() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(this.token);
        },
        volume: 0.5,
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }: any) => {
        console.error(message);
      });
      this.player.addListener('authentication_error', ({ message }: any) => {
        console.error(message);
      });
      this.player.addListener('account_error', ({ message }: any) => {
        console.error(message);
      });
      this.player.addListener('playback_error', ({ message }: any) => {
        console.error(message);
      });

      // Playback status updates
      this.player.addListener('player_state_changed', (state: any) => {
        console.log(state);
      });

      // Ready
      this.player.addListener('ready', ({ device_id }: any) => {
        console.log('Ready with Device ID', device_id);
        this.transferPlaybackHere();
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      this.player.connect();
    };
  }

  public transferPlaybackHere() {
    const url = 'https://api.spotify.com/v1/me/player';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      device_ids: [this.deviceId],
      play: true,
    };

    this.http.put(url, body, { headers }).subscribe(response => {
      console.log('Playback transferred', response);
    });
  }

  public playSong(spotifyUri: string) {
    const url = 'https://api.spotify.com/v1/me/player/play';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      uris: [spotifyUri],
    };

    this.http.put(url, body, { headers }).subscribe(response => {
      console.log('Song playing', response);
    });
  }
}
