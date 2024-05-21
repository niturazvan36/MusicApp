import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { LikedSongsComponent } from './components/liked-songs/liked-songs.component';
import { EventsComponent } from './components/events/events.component';
import { GenresComponent } from './components/genres/genres.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LibraryComponent } from './components/library/library.component';
import { SongsComponent } from './components/songs/songs.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent }
  {
    path: 'user',
    component: UserProfileComponent
  },
  {
    path: 'artist/:artist_id',
    component: ArtistProfileComponent
  },
  {
    path: 'liked_songs',
    component: LikedSongsComponent
  },
  {
    path:'events',
    component: EventsComponent
  },
  {
    path:'genres',
    component: GenresComponent
  },
  { 
    path: 'genres/:item', 
    component: SongsComponent 
  },
  {
    path:'feedback',
    component: FeedbackComponent
  },
  {
    path:'home',
    component: HomeComponent
  }
  ,
  {
    path:'library',
    component: LibraryComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
