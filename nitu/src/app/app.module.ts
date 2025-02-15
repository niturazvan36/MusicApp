import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { LikedSongsComponent } from './components/liked-songs/liked-songs.component';
import { EventsComponent } from './components/events/events.component';
import { GenresComponent } from './components/genres/genres.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LibraryComponent } from './components/library/library.component';
import { SongsComponent } from './components/songs/songs.component';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LikeshowComponent } from './components/likeshow/likeshow.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToplaylistComponent } from './components/toplaylist/toplaylist.component';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    ArtistProfileComponent,
    LikedSongsComponent,
    EventsComponent,
    GenresComponent,
    FeedbackComponent,
    LibraryComponent,
    SongsComponent,
    AddPlaylistComponent,
    PlaylistComponent,
    CallbackComponent,
    LikeshowComponent,
    ToplaylistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
